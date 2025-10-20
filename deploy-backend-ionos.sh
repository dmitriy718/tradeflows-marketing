#!/bin/bash

###############################################################################
# TradeFlows Backend Deployment Script for IONOS VPS
#
# Usage: bash deploy-backend-ionos.sh
#
# Requirements:
# - SSH access to IONOS VPS
# - Node.js 16+ installed on VPS
# - PM2 installed globally on VPS
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE VALUES
VPS_HOST="${VPS_HOST:-your-ionos-vps-ip}"
VPS_USER="${VPS_USER:-root}"
VPS_PORT="${VPS_PORT:-22}"
VPS_PATH="${VPS_PATH:-/var/www/tradeflows}"
LOCAL_BACKEND="./backend"

# Display banner
echo -e "${BLUE}"
echo "========================================"
echo "  TradeFlows Backend Deployment"
echo "  Target: IONOS VPS"
echo "========================================"
echo -e "${NC}"

# Check if configuration is set
if [ "$VPS_HOST" == "your-ionos-vps-ip" ]; then
    echo -e "${RED}ERROR: Please configure VPS_HOST in the script or set environment variable${NC}"
    echo "Example: export VPS_HOST=123.456.789.0"
    exit 1
fi

# Check if backend folder exists
if [ ! -d "$LOCAL_BACKEND" ]; then
    echo -e "${RED}ERROR: Backend folder not found at $LOCAL_BACKEND${NC}"
    exit 1
fi

# Display deployment info
echo -e "${YELLOW}Deployment Configuration:${NC}"
echo "  VPS Host: $VPS_HOST"
echo "  VPS User: $VPS_USER"
echo "  VPS Path: $VPS_PATH"
echo "  Local Backend: $LOCAL_BACKEND"
echo ""

# Confirm deployment
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 0
fi

# Step 1: Create deployment package
echo -e "${BLUE}[1/6] Creating deployment package...${NC}"
cd backend
tar -czf ../backend-deploy.tar.gz .
cd ..

if [ ! -f "backend-deploy.tar.gz" ]; then
    echo -e "${RED}ERROR: Failed to create deployment package${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Package created: backend-deploy.tar.gz${NC}"

# Step 2: Upload to VPS
echo -e "${BLUE}[2/6] Uploading to VPS...${NC}"
scp -P $VPS_PORT backend-deploy.tar.gz $VPS_USER@$VPS_HOST:/tmp/

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to upload package${NC}"
    rm backend-deploy.tar.gz
    exit 1
fi

echo -e "${GREEN}✓ Package uploaded${NC}"

# Step 3: Deploy on VPS
echo -e "${BLUE}[3/6] Deploying on VPS...${NC}"

ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'ENDSSH'
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

VPS_PATH="/var/www/tradeflows"

echo -e "${YELLOW}On VPS: Creating directory structure...${NC}"
mkdir -p $VPS_PATH/backend

echo -e "${YELLOW}On VPS: Stopping existing backend...${NC}"
pm2 stop tradeflows-backend 2>/dev/null || echo "No existing process to stop"

echo -e "${YELLOW}On VPS: Extracting new files...${NC}"
cd $VPS_PATH
tar -xzf /tmp/backend-deploy.tar.gz -C backend/

echo -e "${YELLOW}On VPS: Installing dependencies...${NC}"
cd backend
npm install --production

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: npm install failed${NC}"
    exit 1
fi

echo -e "${YELLOW}On VPS: Starting backend with PM2...${NC}"
pm2 start ecosystem.config.js

echo -e "${YELLOW}On VPS: Saving PM2 configuration...${NC}"
pm2 save

echo -e "${GREEN}✓ Backend deployed and started${NC}"

# Cleanup
rm /tmp/backend-deploy.tar.gz

echo -e "${GREEN}✓ Deployment complete${NC}"

ENDSSH

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Deployment failed on VPS${NC}"
    rm backend-deploy.tar.gz
    exit 1
fi

# Step 4: Verify deployment
echo -e "${BLUE}[4/6] Verifying deployment...${NC}"
sleep 3

ssh -p $VPS_PORT $VPS_USER@$VPS_HOST << 'ENDSSH'
pm2 status
echo ""
echo "Testing API endpoint..."
curl -s http://localhost:3001/api/health | head -20
ENDSSH

# Step 5: Display logs
echo -e "${BLUE}[5/6] Recent logs:${NC}"
ssh -p $VPS_PORT $VPS_USER@$VPS_HOST "pm2 logs tradeflows-backend --lines 10 --nostream"

# Step 6: Cleanup local files
echo -e "${BLUE}[6/6] Cleaning up...${NC}"
rm backend-deploy.tar.gz
echo -e "${GREEN}✓ Cleanup complete${NC}"

# Success message
echo ""
echo -e "${GREEN}========================================"
echo -e "  ✓ Deployment Successful!"
echo -e "========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Test API: curl http://$VPS_HOST:3001/api/health"
echo "  2. View logs: ssh $VPS_USER@$VPS_HOST 'pm2 logs tradeflows-backend'"
echo "  3. Stop backend: ssh $VPS_USER@$VPS_HOST 'pm2 stop tradeflows-backend'"
echo "  4. Restart backend: ssh $VPS_USER@$VPS_HOST 'pm2 restart tradeflows-backend'"
echo ""