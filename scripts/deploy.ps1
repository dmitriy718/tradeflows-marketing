# TradeFlows Automated Deployment Script
# PowerShell script for deploying to IONOS VPS

$VPS_HOST = "65.38.99.52"
$VPS_USER = "root"
$VPS_PASS = "DimaZ7188!"
$VPS_PATH = "/var/www/tradeflows"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "TradeFlows Deployment to IONOS VPS" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Convert password to secure string
$securePassword = ConvertTo-SecureString $VPS_PASS -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($VPS_USER, $securePassword)

Write-Host "Step 1: Creating directories on VPS..." -ForegroundColor Yellow
$createDirs = "mkdir -p $VPS_PATH/html $VPS_PATH/backend $VPS_PATH/app $VPS_PATH/backend/logs"
plink -batch -pw $VPS_PASS ${VPS_USER}@${VPS_HOST} $createDirs

Write-Host ""
Write-Host "Step 2: Uploading marketing website..." -ForegroundColor Yellow
Set-Location "C:\Users\dmitr\Projects\tradeflows-marketing"
pscp -batch -pw $VPS_PASS -r dist/* ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/html/

Write-Host ""
Write-Host "Step 3: Uploading backend..." -ForegroundColor Yellow
pscp -batch -pw $VPS_PASS backend-deploy.tar.gz ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

Write-Host ""
Write-Host "Step 4: Extracting and setting up backend..." -ForegroundColor Yellow
$setupBackend = @"
cd $VPS_PATH &&
tar -xzf backend-deploy.tar.gz -C backend &&
cd backend &&
npm install --production
"@
plink -batch -pw $VPS_PASS ${VPS_USER}@${VPS_HOST} $setupBackend

Write-Host ""
Write-Host "Step 5: Restarting backend with PM2..." -ForegroundColor Yellow
$restartBackend = @"
cd $VPS_PATH/backend &&
command -v pm2 || npm install -g pm2 &&
pm2 stop tradeflows-backend 2>/dev/null || true &&
pm2 start ecosystem.config.js &&
pm2 save &&
pm2 startup systemd -u root --hp /root | tail -n 1 | bash || true
"@
plink -batch -pw $VPS_PASS ${VPS_USER}@${VPS_HOST} $restartBackend

Write-Host ""
Write-Host "Step 6: Uploading TradeFlows PRO app..." -ForegroundColor Yellow
Set-Location "C:\Users\dmitr\Projects\tradeflows-pro"
pscp -batch -pw $VPS_PASS deploy-pro.tar.gz ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

Write-Host ""
Write-Host "Step 7: Extracting PRO app..." -ForegroundColor Yellow
$extractPro = "cd $VPS_PATH && tar -xzf deploy-pro.tar.gz -C app"
plink -batch -pw $VPS_PASS ${VPS_USER}@${VPS_HOST} $extractPro

Write-Host ""
Write-Host "Step 8: Checking PM2 status..." -ForegroundColor Yellow
$checkPm2 = "pm2 list && pm2 logs tradeflows-backend --lines 20 --nostream"
plink -batch -pw $VPS_PASS ${VPS_USER}@${VPS_HOST} $checkPm2

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Marketing Website: http://tradeflows.net" -ForegroundColor Cyan
Write-Host "TradeFlows PRO App: http://app.tradeflows.net" -ForegroundColor Cyan
Write-Host "Backend Dashboard: http://65.38.99.52:3001/dashboard" -ForegroundColor Cyan
Write-Host "Backend Health: http://65.38.99.52:3001/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Blog autoposting should now be active (3x daily at 8am, 12pm, 4:30pm EST)" -ForegroundColor Yellow
Write-Host ""
