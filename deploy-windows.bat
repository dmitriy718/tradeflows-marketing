@echo off
REM TradeFlows Marketing - IONOS VPS Deployment Script (Windows)

SET SERVER_USER=root
SET SERVER_IP=65.38.99.52
SET DEPLOY_PATH=/var/www/tradeflows.net/html
SET BACKUP_PATH=/var/www/tradeflows.net/backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ========================================
echo   TradeFlows Marketing Deployment
echo   Target: IONOS VPS (tradeflows.net)
echo ========================================
echo.

echo [1/6] Building production bundle...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Aborting deployment.
    exit /b 1
)

echo.
echo [2/6] Creating backup on server...
ssh %SERVER_USER%@%SERVER_IP% "mkdir -p %BACKUP_PATH% && cp -r %DEPLOY_PATH%/* %BACKUP_PATH%/ 2>/dev/null || true"

echo.
echo [3/6] Uploading files to server...
echo This may take a minute...
scp -r dist/* %SERVER_USER%@%SERVER_IP%:%DEPLOY_PATH%/

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Upload failed!
    exit /b 1
)

echo.
echo [4/6] Setting proper permissions...
ssh %SERVER_USER%@%SERVER_IP% "chown -R www-data:www-data %DEPLOY_PATH% && chmod -R 755 %DEPLOY_PATH%"

echo.
echo [5/6] Testing nginx configuration...
ssh %SERVER_USER%@%SERVER_IP% "nginx -t"

echo.
echo [6/6] Reloading nginx...
ssh %SERVER_USER%@%SERVER_IP% "systemctl reload nginx"

echo.
echo ========================================
echo   ✅ DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo 🌐 Your site is now live at:
echo    https://tradeflows.net
echo    https://www.tradeflows.net
echo.
echo 💾 Backup saved on server at: %BACKUP_PATH%
echo.
echo 🧪 Test the deployment:
echo    curl -I https://tradeflows.net
echo.
pause
