@echo off
REM =============================================================================
REM TradeFlows Backend Deployment Script for IONOS VPS (Windows)
REM
REM Usage: deploy-backend-ionos.bat
REM
REM Requirements:
REM - Git Bash or WSL installed (for ssh/scp commands)
REM - SSH access to IONOS VPS configured
REM =============================================================================

setlocal

REM Configuration - UPDATE THESE VALUES
set VPS_HOST=65.38.99.52
set VPS_USER=root
set VPS_PORT=22
set VPS_PATH=/var/www/tradeflows-marketing
set LOCAL_BACKEND=.\backend

echo ========================================
echo   TradeFlows Backend Deployment
echo   Target: IONOS VPS
echo ========================================
echo.

REM Check if backend folder exists
if not exist "%LOCAL_BACKEND%" (
    echo ERROR: Backend folder not found at %LOCAL_BACKEND%
    pause
    exit /b 1
)

REM Check configuration
if "%VPS_HOST%"=="your-ionos-vps-ip" (
    echo ERROR: Please configure VPS_HOST in this script
    echo Edit deploy-backend-ionos.bat and set VPS_HOST to your IONOS VPS IP
    pause
    exit /b 1
)

echo Deployment Configuration:
echo   VPS Host: %VPS_HOST%
echo   VPS User: %VPS_USER%
echo   VPS Path: %VPS_PATH%
echo   Local Backend: %LOCAL_BACKEND%
echo.

set /p CONFIRM="Continue with deployment? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Deployment cancelled
    pause
    exit /b 0
)

echo.
echo [1/4] Creating deployment package...
cd backend
tar -czf ..\backend-deploy.tar.gz *
cd ..

if not exist "backend-deploy.tar.gz" (
    echo ERROR: Failed to create deployment package
    pause
    exit /b 1
)

echo OK - Package created
echo.

echo [2/4] Uploading to VPS...
scp -P %VPS_PORT% backend-deploy.tar.gz %VPS_USER%@%VPS_HOST%:/tmp/

if errorlevel 1 (
    echo ERROR: Failed to upload package
    del backend-deploy.tar.gz
    pause
    exit /b 1
)

echo OK - Package uploaded
echo.

echo [3/4] Deploying on VPS...
REM Execute deployment commands on VPS
ssh -p %VPS_PORT% %VPS_USER%@%VPS_HOST% "mkdir -p %VPS_PATH%/backend && cd %VPS_PATH% && pm2 stop tradeflows-backend 2>/dev/null; tar -xzf /tmp/backend-deploy.tar.gz -C backend/ && cd backend && npm install --production && pm2 start ecosystem.config.js && pm2 save && rm /tmp/backend-deploy.tar.gz && echo 'Deployment complete'"

if errorlevel 1 (
    echo ERROR: Deployment failed on VPS
    del backend-deploy.tar.gz
    pause
    exit /b 1
)

echo OK - Deployed on VPS
echo.

echo [4/4] Verifying deployment...
timeout /t 3 /nobreak >nul
ssh -p %VPS_PORT% %VPS_USER%@%VPS_HOST% "pm2 status && echo. && echo Testing API: && curl -s http://localhost:3001/api/health"

echo.
echo Cleaning up local files...
del backend-deploy.tar.gz

echo.
echo ========================================
echo   Deployment Successful!
echo ========================================
echo.
echo Next steps:
echo   1. Test API: curl http://%VPS_HOST%:3001/api/health
echo   2. View logs: ssh %VPS_USER%@%VPS_HOST% pm2 logs tradeflows-backend
echo   3. Stop backend: ssh %VPS_USER%@%VPS_HOST% pm2 stop tradeflows-backend
echo   4. Restart backend: ssh %VPS_USER%@%VPS_HOST% pm2 restart tradeflows-backend
echo.

pause