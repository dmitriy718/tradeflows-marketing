# TradeFlows Auto-Blogging System

Intelligent auto-blogging system that generates SEO-optimized trading/finance content using AI.

## Features

✅ **AI Content Generation** - Uses Claude 3.5 Sonnet for high-quality blog posts
✅ **Trending Keywords** - Automatically researches hot trading topics
✅ **SEO Optimization** - Meta tags, structured data, internal linking
✅ **Automated Scheduling** - Posts 1-3 times per day
✅ **Image Generation** - Creates optimized blog post images
✅ **Performance Monitoring** - Built-in analytics and logging

## System Architecture

```
blog-automation/
├── server.js              # Main server with Express and scheduler
├── src/
│   ├── keywordResearcher.js   # Trending keyword research
│   ├── contentGenerator.js    # AI-powered content creation
│   ├── seoOptimizer.js        # SEO analysis and optimization
│   ├── imageHandler.js        # Image generation/optimization
│   ├── blogManager.js         # Blog post file management
│   └── logger.js              # Winston logging
├── logs/                  # Application logs
└── .env                   # Configuration

```

## Setup

### 1. Install Dependencies

```bash
cd blog-automation
npm install
```

### 2. Configure Environment

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env` and set your Claude API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
ENABLE_AUTO_POSTING=false  # Set to true when ready
```

### 3. Run Tests

```bash
npm test
```

This will test all components and generate a sample blog post.

### 4. Start Server

```bash
npm start
```

Server will start on port 3001 (or PORT from .env).

## API Endpoints

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "uptime": 12345,
  "postsToday": 2
}
```

### GET /api/stats
Get system statistics

**Response:**
```json
{
  "totalPostsGenerated": 45,
  "successfulPosts": 43,
  "failedPosts": 2,
  "postsToday": 2,
  "blog": {
    "totalPosts": 53,
    "categories": {
      "trading-strategies": 25,
      "market-analysis": 15,
      "education": 13
    }
  }
}
```

### POST /api/generate
Manually trigger blog post generation

**Response:**
```json
{
  "success": true,
  "post": {
    "title": "Master Bitcoin Trading: Complete 2025 Guide",
    "slug": "master-bitcoin-trading-complete-2025-guide",
    "category": "trading-strategies",
    "readTime": "8 min read"
  },
  "seo": {
    "score": 92.5,
    "grade": "A+"
  }
}
```

### GET /api/keywords
Get current trending keywords

**Response:**
```json
{
  "keywords": [
    { "keyword": "bitcoin", "score": 95.2, "sources": ["google_trends", "popular_crypto"] },
    { "keyword": "NVDA", "score": 87.3, "sources": ["popular_stocks"] }
  ]
}
```

## Scheduler Configuration

Posts are created at configured times (default: 9 AM, 2 PM, 7 PM):

```env
POST_SCHEDULE_1=0 9 * * *   # 9 AM daily
POST_SCHEDULE_2=0 14 * * *  # 2 PM daily
POST_SCHEDULE_3=0 19 * * *  # 7 PM daily
```

Cron format: `minute hour day month dayOfWeek`

## Deployment to VPS

### 1. Transfer Files

```bash
# From local machine
scp -r blog-automation root@your-vps-ip:/var/www/tradeflows-marketing/
```

### 2. Install Dependencies on VPS

```bash
ssh root@your-vps-ip
cd /var/www/tradeflows-marketing/blog-automation
npm install --production
```

### 3. Create Systemd Service

Create `/etc/systemd/system/tradeflows-blog.service`:

```ini
[Unit]
Description=TradeFlows Auto-Blogging Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/tradeflows-marketing/blog-automation
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### 4. Enable and Start Service

```bash
systemctl daemon-reload
systemctl enable tradeflows-blog
systemctl start tradeflows-blog
systemctl status tradeflows-blog
```

### 5. View Logs

```bash
# Service logs
journalctl -u tradeflows-blog -f

# Application logs
tail -f /var/www/tradeflows-marketing/blog-automation/logs/combined.log
```

## Monitoring

### Check Status
```bash
curl http://localhost:3001/health
```

### View Statistics
```bash
curl http://localhost:3001/api/stats
```

### Manual Post Creation
```bash
curl -X POST http://localhost:3001/api/generate
```

## Configuration Options

### Post Frequency
```env
BLOG_POSTS_PER_DAY_MIN=1  # Minimum posts per day
BLOG_POSTS_PER_DAY_MAX=3  # Maximum posts per day
```

### Feature Flags
```env
ENABLE_AUTO_POSTING=true       # Enable/disable automatic posting
ENABLE_KEYWORD_RESEARCH=true   # Enable/disable keyword research
ENABLE_IMAGE_GENERATION=true   # Enable/disable image generation
ENABLE_SEO_OPTIMIZATION=true   # Enable/disable SEO features
```

## Troubleshooting

### Issue: No posts being generated

**Check:**
1. Is `ENABLE_AUTO_POSTING=true` in .env?
2. Is the service running? `systemctl status tradeflows-blog`
3. Check logs: `tail -f logs/combined.log`
4. Has daily limit been reached? Check `/api/stats`

### Issue: API key errors

**Solution:**
1. Verify `ANTHROPIC_API_KEY` is set in .env
2. Test API key: `npm test`
3. Check Claude API dashboard for rate limits

### Issue: Blog posts not appearing on website

**Check:**
1. Was the frontend rebuilt after adding posts? `npm run build`
2. Is nginx serving the updated files?
3. Check blogPosts.js was updated: `tail ../src/data/blogPosts.js`

## Development

### Run in Development Mode
```bash
npm run dev
```

This uses Node's watch mode to auto-restart on file changes.

### Test Individual Components
```javascript
import { keywordResearcher } from './src/keywordResearcher.js';
const keywords = await keywordResearcher.getTrendingKeywords();
console.log(keywords);
```

## Maintenance

### Backup Blog Posts
The system automatically creates backups before adding new posts.

Backups are stored in: `../src/data/blogPosts.backup-[timestamp].js`

Last 5 backups are kept automatically.

### Clean Up Old Images
```javascript
import { imageHandler } from './src/imageHandler.js';
await imageHandler.cleanupOldImages();
```

### Reset Daily Counter
Daily counter resets automatically at midnight.

To manually reset:
```bash
systemctl restart tradeflows-blog
```

## License

Proprietary - TradeFlows Pro

## Support

For issues or questions, contact the development team.
