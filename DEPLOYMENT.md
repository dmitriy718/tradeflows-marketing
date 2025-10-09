# TradeFlows Marketing - Deployment Guide

## 🎯 Overview

This marketing website is deployed to the IONOS VPS at **65.38.99.52** and serves the domain **tradeflows.net**.

## 📋 Prerequisites

- SSH access to the IONOS VPS (root@65.38.99.52)
- Node.js and npm installed locally
- Git Bash or WSL (for Windows users using rsync)

## 🚀 Quick Deploy

### Windows (PowerShell)
```powershell
cd C:\Users\dmitr\Projects\tradeflows-marketing
.\deploy.ps1
```

### Linux/Mac/Git Bash
```bash
cd /c/Users/dmitr/Projects/tradeflows-marketing
bash deploy.sh
```

## 📝 What the Deployment Does

1. **Builds** the production bundle (`npm run build`)
2. **Backs up** the current site to `/var/www/tradeflows.net/backup-TIMESTAMP`
3. **Uploads** the new `dist/` folder to `/var/www/tradeflows.net/html`
4. **Sets permissions** (www-data:www-data, 755)
5. **Tests** nginx configuration
6. **Reloads** nginx

## 🌐 Live URLs

After deployment, the site is available at:
- **https://tradeflows.net**
- **https://www.tradeflows.net**

## 🔧 Manual Deployment

If you need to deploy manually:

### 1. Build locally
```bash
npm run build
```

### 2. Create backup on server
```bash
ssh root@65.38.99.52 "mkdir -p /var/www/tradeflows.net/backup-$(date +%Y%m%d-%H%M%S) && cp -r /var/www/tradeflows.net/html/* /var/www/tradeflows.net/backup-$(date +%Y%m%d-%H%M%S)/"
```

### 3. Upload files
```bash
scp -r dist/* root@65.38.99.52:/var/www/tradeflows.net/html/
```

### 4. Set permissions
```bash
ssh root@65.38.99.52 "chown -R www-data:www-data /var/www/tradeflows.net/html && chmod -R 755 /var/www/tradeflows.net/html"
```

### 5. Reload nginx
```bash
ssh root@65.38.99.52 "systemctl reload nginx"
```

## 🏗️ Server Architecture

```
IONOS VPS (65.38.99.52)
├── /var/www/tradeflows.net/
│   ├── html/              (Marketing site - this project)
│   └── backup-*/          (Automatic backups)
│
├── /var/www/app.tradeflows.net/
│   └── (Main TradeFlows Pro app)
│
└── /etc/nginx/sites-available/
    ├── tradeflows.net     (Marketing site config)
    └── tradeflows         (App config)
```

## 🔐 SSL/HTTPS

SSL certificates are managed by Certbot and auto-renew. The nginx configuration includes:
- SSL certificate: `/etc/letsencrypt/live/tradeflows.net/fullchain.pem`
- SSL key: `/etc/letsencrypt/live/tradeflows.net/privkey.pem`
- Automatic HTTP → HTTPS redirect

## 🧪 Testing After Deployment

```bash
# Test homepage
curl -I https://tradeflows.net

# Test routing (should return 200, not 404)
curl -I https://tradeflows.net/features
curl -I https://tradeflows.net/pricing
curl -I https://tradeflows.net/about

# Check SSL
curl -Iv https://tradeflows.net 2>&1 | grep "SSL"
```

## 🔄 Rollback

If something goes wrong, rollback to the previous version:

```bash
# List backups
ssh root@65.38.99.52 "ls -la /var/www/tradeflows.net/ | grep backup"

# Restore from backup (replace TIMESTAMP)
ssh root@65.38.99.52 "rm -rf /var/www/tradeflows.net/html/* && cp -r /var/www/tradeflows.net/backup-TIMESTAMP/* /var/www/tradeflows.net/html/ && systemctl reload nginx"
```

## 🐛 Troubleshooting

### Deployment script fails
1. Check SSH connection: `ssh root@65.38.99.52`
2. Verify build succeeds: `npm run build`
3. Check disk space on server: `ssh root@65.38.99.52 "df -h"`

### Site shows old content
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check cache headers: `curl -I https://tradeflows.net`
3. Clear browser cache completely

### 404 errors on routes
1. Verify nginx config includes `try_files $uri $uri/ /index.html;`
2. Check nginx config: `ssh root@65.38.99.52 "cat /etc/nginx/sites-available/tradeflows.net"`
3. Reload nginx: `ssh root@65.38.99.52 "systemctl reload nginx"`

### SSL certificate issues
1. Check certificate expiry: `ssh root@65.38.99.52 "certbot certificates"`
2. Renew if needed: `ssh root@65.38.99.52 "certbot renew"`

## 📊 Monitoring

### Check server status
```bash
ssh root@65.38.99.52 "systemctl status nginx"
```

### View access logs
```bash
ssh root@65.38.99.52 "tail -f /var/log/nginx/access.log"
```

### View error logs
```bash
ssh root@65.38.99.52 "tail -f /var/log/nginx/error.log"
```

## 🎨 Development

For local development:
```bash
npm run dev
# Visit http://localhost:3000
```

For production preview:
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
tradeflows-marketing/
├── src/               # Source code
│   ├── pages/        # All pages
│   ├── components/   # Navigation, Footer
│   ├── data/         # KB articles, blog posts
│   └── styles/       # Global CSS
├── public/           # Static assets (logos)
├── dist/             # Production build (generated)
├── deploy.sh         # Bash deployment script
├── deploy.ps1        # PowerShell deployment script
└── DEPLOYMENT.md     # This file
```

## ✅ Pre-Deployment Checklist

- [ ] Test site locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] All pages work in production preview (`npm run preview`)
- [ ] No console errors in browser
- [ ] All links work
- [ ] Forms work
- [ ] Mobile responsive
- [ ] SSH access to server confirmed

---

**Last Updated:** $(date)
**Deployed By:** $(whoami)
