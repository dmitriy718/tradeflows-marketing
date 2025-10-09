# TradeFlows Marketing - IONOS VPS Deployment Script (PowerShell)

# Configuration
$SERVER_USER = "root"
$SERVER_IP = "65.38.99.52"
$DEPLOY_PATH = "/var/www/tradeflows.net/html"
$BACKUP_NAME = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$BACKUP_PATH = "/var/www/tradeflows.net/$BACKUP_NAME"

Write-Host "🚀 Deploying TradeFlows Marketing to IONOS VPS..." -ForegroundColor Cyan

# Build the application
Write-Host "📦 Building production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}

# Create backup of current site
Write-Host "💾 Creating backup of current site..." -ForegroundColor Yellow
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $BACKUP_PATH && cp -r $DEPLOY_PATH/* $BACKUP_PATH/ 2>/dev/null || true"

# Copy files to server using rsync (via WSL or Git Bash)
Write-Host "📤 Uploading files to server..." -ForegroundColor Yellow

# Check if rsync is available
$rsyncAvailable = Get-Command rsync -ErrorAction SilentlyContinue

if ($rsyncAvailable) {
    # Use rsync (faster, incremental)
    rsync -avz --delete `
      --exclude 'node_modules' `
      --exclude '.git' `
      --exclude 'src' `
      --exclude '*.log' `
      --exclude '*.md' `
      --exclude 'package*.json' `
      --exclude 'vite.config.js' `
      --exclude 'deploy.sh' `
      --exclude 'deploy.ps1' `
      dist/ "$SERVER_USER@${SERVER_IP}:$DEPLOY_PATH/"
} else {
    # Fallback to scp (slower but works everywhere)
    Write-Host "⚠️  rsync not found, using scp (slower)..." -ForegroundColor Yellow
    scp -r dist/* "$SERVER_USER@${SERVER_IP}:$DEPLOY_PATH/"
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed! Restoring backup..." -ForegroundColor Red
    ssh "$SERVER_USER@$SERVER_IP" "rm -rf $DEPLOY_PATH/* && cp -r $BACKUP_PATH/* $DEPLOY_PATH/"
    exit 1
}

# Set proper permissions
Write-Host "🔒 Setting permissions..." -ForegroundColor Yellow
ssh "$SERVER_USER@$SERVER_IP" "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

# Test nginx configuration
Write-Host "🔧 Testing nginx configuration..." -ForegroundColor Yellow
ssh "$SERVER_USER@$SERVER_IP" "nginx -t"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Nginx config has issues, but files are deployed" -ForegroundColor Yellow
} else {
    Write-Host "✅ Nginx configuration is valid" -ForegroundColor Green
}

# Reload nginx
Write-Host "🔄 Reloading nginx..." -ForegroundColor Yellow
ssh "$SERVER_USER@$SERVER_IP" "systemctl reload nginx"

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 TradeFlows Marketing is now live at:" -ForegroundColor Cyan
Write-Host "   https://tradeflows.net" -ForegroundColor White
Write-Host "   https://www.tradeflows.net" -ForegroundColor White
Write-Host ""
Write-Host "💾 Backup saved to: $BACKUP_PATH" -ForegroundColor Yellow
Write-Host ""
Write-Host "🧪 Test the site:" -ForegroundColor Cyan
Write-Host "   curl -I https://tradeflows.net" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
