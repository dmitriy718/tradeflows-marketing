@echo off
REM TradeFlows Auto-Deploy Script for Windows with Credentials

set VPS_HOST=65.38.99.52
set VPS_USER=root
set VPS_PASS=DimaZ7188!
set VPS_PATH=/var/www/tradeflows

echo ================================================
echo TradeFlows Automated Deployment Script
echo ================================================
echo.

REM Check if plink is available (part of PuTTY)
where plink >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Warning: plink not found. You may need to install PuTTY.
    echo Continuing with pscp if available...
)

REM Build the project
echo Building marketing website...
cd /d "%~dp0.."
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    exit /b 1
)

echo Build successful!
echo.

echo Deploying to VPS...

REM Create deployment package
echo Creating deployment package...
tar -czf deploy-package.tar.gz -C dist .
tar -czf backend-deploy.tar.gz -C backend .

echo.
echo Uploading files to VPS...

REM Use pscp (PuTTY SCP) with password
echo %VPS_PASS%| pscp -pw %VPS_PASS% -r dist\* %VPS_USER%@%VPS_HOST%:%VPS_PATH%/html/
echo %VPS_PASS%| pscp -pw %VPS_PASS% backend-deploy.tar.gz %VPS_USER%@%VPS_HOST%:%VPS_PATH%/

echo.
echo Setting up backend on VPS...

REM Execute commands on VPS
echo %VPS_PASS%| plink -pw %VPS_PASS% %VPS_USER%@%VPS_HOST% "cd %VPS_PATH% && tar -xzf backend-deploy.tar.gz -C backend && cd backend && npm install --production && pm2 restart tradeflows-backend || pm2 start ecosystem.config.js && pm2 save"

echo.
echo ================================================
echo Deployment Complete!
echo ================================================
echo.
echo Website: http://tradeflows.net
echo Backend: http://65.38.99.52:3001/dashboard
echo Health: http://65.38.99.52:3001/api/health
echo.
echo Run 'plink -pw %VPS_PASS% %VPS_USER%@%VPS_HOST%' to connect to VPS
echo.

pause
