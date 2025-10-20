@echo off
REM Simple deployment script using OpenSSH scp and ssh

set VPS_HOST=65.38.99.52
set VPS_USER=root
set VPS_PASS=DimaZ7188!
set VPS_PATH=/var/www/tradeflows

echo ================================================
echo TradeFlows Deployment Script
echo ================================================
echo.

REM Change to project root
cd /d "%~dp0.."

echo Step 1: Creating directories on VPS...
echo %VPS_PASS% | ssh -o StrictHostKeyChecking=no %VPS_USER%@%VPS_HOST% "mkdir -p %VPS_PATH%/html %VPS_PATH%/backend %VPS_PATH%/backend/logs"

echo.
echo Step 2: Deploying marketing website...
scp -o StrictHostKeyChecking=no -r dist/* %VPS_USER%@%VPS_HOST%:%VPS_PATH%/html/

echo.
echo Step 3: Deploying backend...
scp -o StrictHostKeyChecking=no -r backend/* %VPS_USER%@%VPS_HOST%:%VPS_PATH%/backend/

echo.
echo Step 4: Installing backend dependencies...
ssh -o StrictHostKeyChecking=no %VPS_USER%@%VPS_HOST% "cd %VPS_PATH%/backend && npm install --production"

echo.
echo Step 5: Restarting backend with PM2...
ssh -o StrictHostKeyChecking=no %VPS_USER%@%VPS_HOST% "command -v pm2 || npm install -g pm2 && cd %VPS_PATH%/backend && pm2 restart tradeflows-backend || pm2 start ecosystem.config.js && pm2 save"

echo.
echo ================================================
echo Deployment Complete!
echo ================================================
echo.
echo Website: http://tradeflows.net
echo Backend: http://65.38.99.52:3001/dashboard
echo Health: http://65.38.99.52:3001/api/health
echo.

pause
