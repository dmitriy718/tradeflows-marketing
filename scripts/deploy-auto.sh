#!/bin/bash

# TradeFlows Auto-Deploy Script with Credentials
# This script automatically deploys both marketing website and backend to IONOS VPS

VPS_HOST="65.38.99.52"
VPS_USER="root"
VPS_PASS="DimaZ7188!"
VPS_PATH="/var/www/tradeflows"

echo "================================================"
echo "TradeFlows Automated Deployment Script"
echo "================================================"
echo ""

# Function to run SSH commands with password
run_ssh() {
    sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "$1"
}

# Function to run SCP with password
run_scp() {
    sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no -r "$1" "$VPS_USER@$VPS_HOST:$2"
}

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    echo "❌ sshpass is not installed. Installing..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y sshpass
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install sshpass
    else
        echo "Please install sshpass manually"
        exit 1
    fi
fi

echo "📦 Building marketing website..."
cd "$(dirname "$0")/.."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "📤 Deploying to VPS..."

# Create directories on VPS
echo "Creating directories..."
run_ssh "mkdir -p $VPS_PATH/html $VPS_PATH/backend $VPS_PATH/backend/logs"

# Deploy frontend
echo "Deploying frontend..."
run_scp "dist/*" "$VPS_PATH/html/"

# Deploy backend
echo "Deploying backend..."
run_scp "backend/*" "$VPS_PATH/backend/"

# Install backend dependencies and restart
echo "Installing backend dependencies..."
run_ssh "cd $VPS_PATH/backend && npm install --production"

# Check if PM2 is installed
echo "Checking PM2..."
run_ssh "command -v pm2 || npm install -g pm2"

# Stop existing process
echo "Stopping existing backend process..."
run_ssh "pm2 stop tradeflows-backend || true"

# Start/restart backend with PM2
echo "Starting backend process..."
run_ssh "cd $VPS_PATH/backend && pm2 start ecosystem.config.js"

# Save PM2 configuration
run_ssh "pm2 save"

# Setup PM2 startup script
run_ssh "pm2 startup systemd -u root --hp /root | tail -n 1 | bash || true"

echo ""
echo "================================================"
echo "✅ Deployment Complete!"
echo "================================================"
echo ""
echo "🌐 Website: http://tradeflows.net"
echo "📊 Backend: http://65.38.99.52:3001/dashboard"
echo "💚 Health: http://65.38.99.52:3001/api/health"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 status           - Check status"
echo "  pm2 logs             - View logs"
echo "  pm2 restart backend  - Restart backend"
echo "  pm2 monit            - Monitor processes"
echo ""
