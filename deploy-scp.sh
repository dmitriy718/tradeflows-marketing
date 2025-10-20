#!/bin/bash
# TradeFlows Marketing - Simple SCP Deployment

SERVER_USER="root"
SERVER_IP="65.38.99.52"
DEPLOY_PATH="/var/www/tradeflows.net/html"

echo "🚀 Deploying TradeFlows Marketing to IONOS VPS..."
echo ""

# Build already completed, using existing dist folder
echo "✓ Build complete (dist/ folder ready)"
echo ""

# Create tarball of dist folder
echo "📦 Creating archive..."
cd dist
tar -czf ../deploy-package.tar.gz .
cd ..

if [ $? -ne 0 ]; then
    echo "❌ Failed to create archive"
    exit 1
fi

echo "✓ Archive created: deploy-package.tar.gz"
echo ""

# Upload tarball
echo "📤 Uploading to server..."
scp deploy-package.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    rm deploy-package.tar.gz
    exit 1
fi

echo "✓ Files uploaded"
echo ""

# Extract on server
echo "📂 Extracting files on server..."
ssh $SERVER_USER@$SERVER_IP << 'EOF'
# Backup current site
BACKUP_DIR="/var/www/tradeflows.net/backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r /var/www/tradeflows.net/html/* $BACKUP_DIR/ 2>/dev/null || true

# Extract new files
cd /var/www/tradeflows.net/html
rm -rf *
tar -xzf /tmp/deploy-package.tar.gz

# Set permissions
chown -R www-data:www-data /var/www/tradeflows.net/html
chmod -R 755 /var/www/tradeflows.net/html

# Clean up
rm /tmp/deploy-package.tar.gz

# Test and reload nginx
nginx -t && systemctl reload nginx

echo "Backup saved to: $BACKUP_DIR"
EOF

# Clean up local tarball
rm deploy-package.tar.gz

echo ""
echo "=========================================="
echo "   ✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "🌐 Your site is now live at:"
echo "   https://tradeflows.net"
echo "   https://www.tradeflows.net"
echo ""
echo "🧪 Test it:"
echo "   curl -I https://tradeflows.net"
echo ""
