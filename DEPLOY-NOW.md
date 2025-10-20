# TradeFlows Deployment Instructions

## Quick Deployment Steps

The host key has changed on your VPS, so you need to accept it manually first.

### Step 1: Clear Old Host Key
Run this command to remove the old cached key:
```powershell
reg delete HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\SshHostKeys /f
```

### Step 2: Run Deployment
Open **PowerShell as Administrator** and run:

```powershell
cd C:\Users\dmitr\Projects\tradeflows-marketing

# Deploy Marketing Website
plink -pw DimaZ7188! root@65.38.99.52 "mkdir -p /var/www/tradeflows/html /var/www/tradeflows/backend /var/www/tradeflows/app"
pscp -r -pw DimaZ7188! dist/* root@65.38.99.52:/var/www/tradeflows/html/
pscp -pw DimaZ7188! backend-deploy.tar.gz root@65.38.99.52:/var/www/tradeflows/

# Setup Backend
plink -pw DimaZ7188! root@65.38.99.52 "cd /var/www/tradeflows && tar -xzf backend-deploy.tar.gz -C backend && cd backend && npm install --production"

# Restart Backend with PM2
plink -pw DimaZ7188! root@65.38.99.52 "cd /var/www/tradeflows/backend && npm install -g pm2 && pm2 stop tradeflows-backend; pm2 start ecosystem.config.js && pm2 save"

# Deploy TradeFlows PRO App
cd C:\Users\dmitr\Projects\tradeflows-pro
pscp -pw DimaZ7188! deploy-pro.tar.gz root@65.38.99.52:/var/www/tradeflows/
plink -pw DimaZ7188! root@65.38.99.52 "cd /var/www/tradeflows && tar -xzf deploy-pro.tar.gz -C app"

# Check Status
plink -pw DimaZ7188! root@65.38.99.52 "pm2 list && pm2 logs tradeflows-backend --lines 20 --nostream"
```

### Step 3: Verify Deployment

Visit these URLs to verify:
- **Marketing Website**: http://tradeflows.net
- **TradeFlows PRO App**: http://app.tradeflows.net
- **Backend Health**: http://65.38.99.52:3001/api/health
- **Backend Dashboard**: http://65.38.99.52:3001/dashboard

## What Was Fixed

✅ **Mobile Navigation** - Now shows all menu items properly on mobile
✅ **New Logo** - Premium design with broken ring and ascending green bars
✅ **Blog Autoposting** - Backend will resume posting 3x daily after PM2 restart
✅ **Both Apps Built** - Marketing site and PRO app are production-ready

## Files Ready for Deployment

- `deploy-package.tar.gz` - Marketing website
- `backend-deploy.tar.gz` - Backend with blog autoposting
- `C:\Users\dmitr\Projects\tradeflows-pro\deploy-pro.tar.gz` - PRO app

## Need Help?

If you get prompted to accept the host key, type `y` and press Enter.

Password is: **DimaZ7188!**
