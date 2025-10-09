#!/bin/bash
# TradeFlows Marketing - IONOS VPS Deployment Script

# Configuration
SERVER_USER="root"
SERVER_IP="65.38.99.52"
DEPLOY_PATH="/var/www/tradeflows.net/html"
BACKUP_PATH="/var/www/tradeflows.net/backup-$(date +%Y%m%d-%H%M%S)"

echo "🚀 Deploying TradeFlows Marketing to IONOS VPS..."

# Build the application
echo "📦 Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Aborting deployment."
    exit 1
fi

# Create backup of current site
echo "💾 Creating backup of current site..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $BACKUP_PATH && cp -r $DEPLOY_PATH/* $BACKUP_PATH/ 2>/dev/null || true"

# Copy files to server
echo "📤 Uploading files to server..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'src' \
  --exclude '*.log' \
  --exclude '*.md' \
  --exclude 'package*.json' \
  --exclude 'vite.config.js' \
  --exclude 'deploy.sh' \
  dist/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed! Restoring backup..."
    ssh $SERVER_USER@$SERVER_IP "rm -rf $DEPLOY_PATH/* && cp -r $BACKUP_PATH/* $DEPLOY_PATH/"
    exit 1
fi

# Set proper permissions
echo "🔒 Setting permissions..."
ssh $SERVER_USER@$SERVER_IP "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

# Test nginx configuration
echo "🔧 Testing nginx configuration..."
ssh $SERVER_USER@$SERVER_IP "nginx -t"

if [ $? -ne 0 ]; then
    echo "⚠️  Nginx config has issues, but files are deployed"
else
    echo "✅ Nginx configuration is valid"
fi

# Reload nginx
echo "🔄 Reloading nginx..."
ssh $SERVER_USER@$SERVER_IP "systemctl reload nginx"

echo ""
echo "✅ Deployment complete!"
echo "🌐 TradeFlows Marketing is now live at:"
echo "   https://tradeflows.net"
echo "   https://www.tradeflows.net"
echo ""
echo "💾 Backup saved to: $BACKUP_PATH"
echo ""
echo "🧪 Test the site:"
echo "   curl -I https://tradeflows.net"
