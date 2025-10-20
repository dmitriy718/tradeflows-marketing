# Deployment Guide - IONOS VPS

Complete guide for deploying TradeFlows Marketing site to IONOS VPS.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Deploy Application](#deploy-application)
4. [Configure Nginx](#configure-nginx)
5. [SSL Certificate](#ssl-certificate)
6. [Domain Configuration](#domain-configuration)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Local Machine
- [ ] Node.js 18+ installed
- [ ] Git configured
- [ ] SSH client (built-in on Mac/Linux, PuTTY on Windows)
- [ ] Production build tested locally

### IONOS VPS Information
- [ ] VPS IP Address: _______________
- [ ] SSH Username: _______________
- [ ] SSH Password/Key: _______________
- [ ] Domain: tradeflows.net (or your domain)

### Required Access
- [ ] IONOS account access
- [ ] VPS root/sudo access
- [ ] Domain DNS management access

---

## Server Setup

### 1. Connect to VPS

```bash
# SSH into your IONOS VPS
ssh root@YOUR_VPS_IP

# Or if using a specific user
ssh username@YOUR_VPS_IP
```

### 2. Update System

```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git ufw
```

### 3. Install Node.js

```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 4. Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### 5. Configure Firewall

```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP
sudo ufw allow 'Nginx HTTP'

# Allow HTTPS
sudo ufw allow 'Nginx HTTPS'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Deploy Application

### 1. Create Deployment Directory

```bash
# Create directory for the application
sudo mkdir -p /var/www/tradeflows-marketing

# Set ownership
sudo chown -R $USER:$USER /var/www/tradeflows-marketing

# Navigate to directory
cd /var/www/tradeflows-marketing
```

### 2. Clone or Upload Repository

**Option A: Using Git (Recommended)**

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tradeflows-marketing.git .

# Or if using SSH
git clone git@github.com:YOUR_USERNAME/tradeflows-marketing.git .
```

**Option B: Using SCP (from local machine)**

```bash
# From your local machine, navigate to project directory
cd /path/to/tradeflows-marketing

# Copy entire project to VPS
scp -r . root@YOUR_VPS_IP:/var/www/tradeflows-marketing/
```

**Option C: Using SFTP/FTP**
- Use FileZilla or similar
- Connect to VPS
- Upload all files to `/var/www/tradeflows-marketing/`

### 3. Install Dependencies

```bash
# On VPS, navigate to project
cd /var/www/tradeflows-marketing

# Install dependencies
npm install

# Install production dependencies only (alternative)
# npm ci --production
```

### 4. Build Production Bundle

```bash
# Build the application
npm run build

# Verify build
ls -la dist/

# You should see:
# - index.html
# - assets/ (containing JS, CSS, images)
```

### 5. Test the Build Locally on VPS (Optional)

```bash
# Preview the production build
npm run preview

# Check if accessible at http://YOUR_VPS_IP:4173
# Then stop with Ctrl+C
```

---

## Configure Nginx

### 1. Create Nginx Configuration

```bash
# Create new site configuration
sudo nano /etc/nginx/sites-available/tradeflows-marketing
```

### 2. Add Configuration

```nginx
# /etc/nginx/sites-available/tradeflows-marketing

server {
    listen 80;
    listen [::]:80;

    server_name tradeflows.net www.tradeflows.net;
    root /var/www/tradeflows-marketing/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/rss+xml
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        image/svg+xml;

    # Asset caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router - SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Access and error logs
    access_log /var/log/nginx/tradeflows-marketing-access.log;
    error_log /var/log/nginx/tradeflows-marketing-error.log;
}
```

Save and exit (Ctrl+X, Y, Enter).

### 3. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/tradeflows-marketing /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Should show:
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Verify Deployment

```bash
# Check if site is accessible
curl -I http://YOUR_VPS_IP

# Should return HTTP 200 OK

# Or visit in browser:
# http://YOUR_VPS_IP
# http://tradeflows.net (if DNS configured)
```

---

## SSL Certificate

### 1. Install Certbot

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
# Get certificate for your domain
sudo certbot --nginx -d tradeflows.net -d www.tradeflows.net

# Follow prompts:
# - Enter email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)
```

### 3. Verify SSL

```bash
# Check certificate
sudo certbot certificates

# Test auto-renewal
sudo certbot renew --dry-run
```

### 4. Configure Auto-Renewal

```bash
# Certbot installs auto-renewal automatically
# Verify cron job exists
sudo systemctl status certbot.timer

# Or check cron
sudo crontab -l
```

### 5. Updated Nginx Configuration with SSL

After Certbot runs, it updates your Nginx config automatically. Verify:

```bash
sudo nano /etc/nginx/sites-available/tradeflows-marketing
```

Should now include:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name tradeflows.net www.tradeflows.net;

    ssl_certificate /etc/letsencrypt/live/tradeflows.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tradeflows.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # ... rest of configuration
}

server {
    listen 80;
    listen [::]:80;
    server_name tradeflows.net www.tradeflows.net;
    return 301 https://$server_name$request_uri;
}
```

---

## Domain Configuration

### 1. Configure DNS at IONOS

Log into IONOS account → DNS Management:

**A Records:**
```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600
```

```
Type: A
Name: www
Value: YOUR_VPS_IP
TTL: 3600
```

**Optional - CNAME for www:**
```
Type: CNAME
Name: www
Value: tradeflows.net
TTL: 3600
```

### 2. Verify DNS Propagation

```bash
# Check DNS resolution
dig tradeflows.net
dig www.tradeflows.net

# Or use online tool:
# https://dnschecker.org/
```

DNS propagation can take 24-48 hours, but usually completes within a few hours.

---

## Monitoring & Maintenance

### 1. Setup Log Rotation

```bash
# Nginx logs are automatically rotated
# Verify configuration
cat /etc/logrotate.d/nginx
```

### 2. Monitor Server Resources

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check Nginx status
sudo systemctl status nginx

# View recent Nginx logs
sudo tail -f /var/log/nginx/tradeflows-marketing-access.log
sudo tail -f /var/log/nginx/tradeflows-marketing-error.log
```

### 3. Regular Updates

```bash
# Update system packages weekly
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies (when needed)
cd /var/www/tradeflows-marketing
npm update
npm run build
sudo systemctl reload nginx
```

### 4. Backup Strategy

**Automated Backup Script:**

```bash
# Create backup script
sudo nano /usr/local/bin/backup-tradeflows.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/tradeflows"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup website files
tar -czf $BACKUP_DIR/tradeflows-$DATE.tar.gz /var/www/tradeflows-marketing

# Keep only last 7 days of backups
find $BACKUP_DIR -name "tradeflows-*.tar.gz" -mtime +7 -delete

echo "Backup completed: tradeflows-$DATE.tar.gz"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-tradeflows.sh

# Test backup
sudo /usr/local/bin/backup-tradeflows.sh

# Schedule daily backup (3 AM)
sudo crontab -e
```

Add:
```
0 3 * * * /usr/local/bin/backup-tradeflows.sh >> /var/log/tradeflows-backup.log 2>&1
```

### 5. Monitoring Tools (Optional)

**Install pm2 for process management:**

```bash
sudo npm install -g pm2

# Although not needed for static site,
# useful if you add Node.js backend later
```

---

## Deployment Updates

### Update Process

When you make changes to the site:

**Option 1: Git Pull (if using Git)**

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Navigate to project
cd /var/www/tradeflows-marketing

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

**Option 2: Upload New Build**

```bash
# From local machine, build first
npm run build

# Upload dist folder to VPS
scp -r dist/* root@YOUR_VPS_IP:/var/www/tradeflows-marketing/dist/

# Reload Nginx on VPS
ssh root@YOUR_VPS_IP "sudo systemctl reload nginx"
```

### Zero-Downtime Deployment

For zero-downtime updates:

```bash
# Create deployment script
sudo nano /usr/local/bin/deploy-tradeflows.sh
```

Add:

```bash
#!/bin/bash
set -e

PROJECT_DIR="/var/www/tradeflows-marketing"
BACKUP_DIR="/var/www/tradeflows-backup"

echo "Starting deployment..."

# Backup current version
cp -r $PROJECT_DIR/dist $BACKUP_DIR

# Pull latest code
cd $PROJECT_DIR
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

echo "Deployment completed successfully!"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/deploy-tradeflows.sh

# Run deployment
sudo /usr/local/bin/deploy-tradeflows.sh
```

---

## Troubleshooting

### Site Not Loading

1. **Check Nginx Status:**
   ```bash
   sudo systemctl status nginx
   ```

2. **Check Nginx Error Logs:**
   ```bash
   sudo tail -50 /var/log/nginx/error.log
   sudo tail -50 /var/log/nginx/tradeflows-marketing-error.log
   ```

3. **Test Nginx Configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

### 404 Errors on Page Refresh

This is common with React Router. Ensure your Nginx config has:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Then reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate Issues

1. **Check Certificate Status:**
   ```bash
   sudo certbot certificates
   ```

2. **Renew Certificate Manually:**
   ```bash
   sudo certbot renew
   ```

3. **Force Renewal:**
   ```bash
   sudo certbot renew --force-renewal
   ```

### Performance Issues

1. **Check Server Resources:**
   ```bash
   htop  # Install with: sudo apt install htop
   df -h
   free -h
   ```

2. **Enable Nginx Caching:**

   Add to Nginx config:
   ```nginx
   proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;
   ```

3. **Optimize Nginx Worker Processes:**

   Edit `/etc/nginx/nginx.conf`:
   ```nginx
   worker_processes auto;
   worker_connections 1024;
   ```

### DNS Not Resolving

1. **Check DNS Records:**
   ```bash
   dig tradeflows.net
   nslookup tradeflows.net
   ```

2. **Flush DNS Cache (on local machine):**

   **Windows:**
   ```cmd
   ipconfig /flushdns
   ```

   **Mac:**
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

   **Linux:**
   ```bash
   sudo systemd-resolve --flush-caches
   ```

3. **Wait for DNS Propagation:**
   - Can take up to 48 hours
   - Check progress: https://dnschecker.org/

### Build Fails on VPS

1. **Check Node.js Version:**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clear npm Cache:**
   ```bash
   npm cache clean --force
   ```

3. **Delete node_modules and Reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

4. **Check Disk Space:**
   ```bash
   df -h
   ```

---

## Security Best Practices

### 1. Change Default SSH Port

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Change line:
# Port 22
# to
Port 2222

# Restart SSH
sudo systemctl restart sshd

# Update firewall
sudo ufw allow 2222/tcp
```

### 2. Disable Root Login

```bash
# Create non-root user first
sudo adduser deployuser
sudo usermod -aG sudo deployuser

# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set:
PermitRootLogin no

# Restart SSH
sudo systemctl restart sshd
```

### 3. Install Fail2Ban

```bash
# Install
sudo apt install -y fail2ban

# Start service
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### 4. Enable Automatic Security Updates

```bash
# Install unattended-upgrades
sudo apt install -y unattended-upgrades

# Enable
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## Performance Optimization

### 1. Enable HTTP/2

HTTP/2 is enabled automatically when using SSL:
```nginx
listen 443 ssl http2;
```

### 2. Enable Brotli Compression (Optional)

```bash
# Install Brotli
sudo apt install -y nginx-module-brotli

# Add to nginx.conf
sudo nano /etc/nginx/nginx.conf
```

Add:
```nginx
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;

http {
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css text/xml text/javascript application/json application/javascript;
}
```

### 3. Configure Browser Caching

Already included in Nginx config, but verify:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Post-Deployment Checklist

- [ ] Site accessible via HTTP
- [ ] Site accessible via HTTPS
- [ ] SSL certificate valid
- [ ] WWW redirects correctly
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms functional
- [ ] Images load
- [ ] Live Chat Widget works
- [ ] Exit Intent Popup triggers
- [ ] Social Proof Notifications display
- [ ] UTM parameters present in links
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] DNS fully propagated
- [ ] Backups scheduled
- [ ] Monitoring in place
- [ ] SSL auto-renewal configured

---

## Quick Reference Commands

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Navigate to project
cd /var/www/tradeflows-marketing

# Pull updates
git pull origin main

# Install deps and build
npm install && npm run build

# Reload Nginx
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/tradeflows-marketing-error.log

# Restart Nginx
sudo systemctl restart nginx

# Test Nginx config
sudo nginx -t

# Renew SSL
sudo certbot renew

# Check disk space
df -h

# Check memory
free -h
```

---

## Support & Resources

### Documentation
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)
- [IONOS Help Center](https://www.ionos.com/help/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

### Useful Tools
- DNS Checker: https://dnschecker.org/
- SSL Test: https://www.ssllabs.com/ssltest/
- PageSpeed Insights: https://pagespeed.web.dev/
- HTTP/2 Test: https://tools.keycdn.com/http2-test

---

**Last Updated:** October 9, 2025
**Version:** 1.0.0
**Deployed By:** _______________
**Deployment Date:** _______________
