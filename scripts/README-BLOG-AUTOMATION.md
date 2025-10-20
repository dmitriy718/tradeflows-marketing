# Automated Blog Post System

This system automatically generates SEO-optimized blog posts daily at 8 AM EST to drive organic traffic.

## Features

- **Automated Generation**: Creates 1 blog post per day
- **SEO Optimized**: Uses 20+ high-traffic keywords
- **Multiple Templates**: 3 different article formats
- **Natural Content**: Reads like human-written content
- **UTM Tracking**: All links include proper UTM parameters

## Setup Instructions

### Option 1: Windows Task Scheduler (Recommended for Windows)

1. **Run the setup script**:
   ```bash
   cd scripts
   ./schedule-blog-posts.bat
   ```

2. **Verify the task was created**:
   ```bash
   schtasks /Query /TN "TradeFlows_Daily_Blog_Post"
   ```

3. **Test the task manually**:
   ```bash
   schtasks /Run /TN "TradeFlows_Daily_Blog_Post"
   ```

### Option 2: Manual Node.js Execution

```bash
cd scripts
node generateBlogPost.js
```

### Option 3: Linux/Mac Cron Job

1. Edit crontab:
   ```bash
   crontab -e
   ```

2. Add this line (8 AM EST daily):
   ```
   0 13 * * * cd /path/to/tradeflows-marketing && node scripts/generateBlogPost.js >> logs/blog-generation.log 2>&1
   ```
   Note: 13:00 UTC = 8:00 AM EST

## How It Works

1. **Keyword Selection**: Randomly selects from 20 SEO keywords
2. **Template Selection**: Chooses from 3 article templates
3. **Content Generation**: Fills template with keyword-optimized content
4. **File Update**: Adds new post to `src/data/blogPosts.js`
5. **Logging**: Records generation in `logs/blog-generation.log`

## SEO Keywords Used

The system rotates through these high-traffic keywords:

- AI trading strategies
- Stock market analysis
- Cryptocurrency trading
- Forex trading tips
- Portfolio management
- Technical analysis
- Trading indicators
- Market trends 2025
- Algorithmic trading
- Risk management trading
- Day trading strategies
- Swing trading
- Options trading
- Futures trading
- Market volatility
- Trading psychology
- Backtesting strategies
- Automated trading
- Trade signals
- Market sentiment analysis

## Article Templates

### Template 1: Complete Guide
Format: "{{keyword}}: Complete Guide for {{year}}"
- Comprehensive coverage of topic
- Step-by-step instructions
- Real-world examples
- Actionable checklist

### Template 2: Common Mistakes
Format: "5 {{keyword}} Mistakes Traders Make (And How to Fix Them)"
- Problem/solution format
- Highly shareable
- Focuses on pain points
- Clear action items

### Template 3: Comparison
Format: "{{keyword}} vs Traditional Methods: Which is Better?"
- Head-to-head analysis
- Data-driven insights
- Balanced perspective
- Clear recommendations

## UTM Parameters

All generated links include UTM tracking:
```
?utm_source=blog&utm_medium=article&utm_campaign={{keyword-slug}}
```

This allows tracking:
- Which articles drive traffic
- Conversion rates per article
- ROI of blog content

## Monitoring & Maintenance

### View Generation Logs
```bash
cat logs/blog-generation.log
```

### Check Scheduled Task Status
```bash
schtasks /Query /TN "TradeFlows_Daily_Blog_Post" /V /FO LIST
```

### Modify Schedule Time
```bash
schtasks /Change /TN "TradeFlows_Daily_Blog_Post" /ST 09:00
```

### Disable Task
```bash
schtasks /Change /TN "TradeFlows_Daily_Blog_Post" /DISABLE
```

### Enable Task
```bash
schtasks /Change /TN "TradeFlows_Daily_Blog_Post" /ENABLE
```

### Delete Task
```bash
schtasks /Delete /TN "TradeFlows_Daily_Blog_Post" /F
```

## Customization

### Add New Keywords
Edit `scripts/generateBlogPost.js`:
```javascript
const keywords = [
  // Add your keywords here
  'new trading keyword',
];
```

### Add New Templates
Edit `scripts/generateBlogPost.js`:
```javascript
const templates = [
  {
    titlePattern: "Your New Pattern",
    slug: "your-slug-pattern",
    category: "Category Name",
    content: `Your template content...`
  }
];
```

### Change Generation Time
Modify the `/ST` parameter in `schedule-blog-posts.bat`:
```batch
/ST 09:00  REM Changes to 9 AM
```

## Troubleshooting

### Task Not Running

1. **Check task exists**:
   ```bash
   schtasks /Query /TN "TradeFlows_Daily_Blog_Post"
   ```

2. **Verify last run time**:
   ```bash
   schtasks /Query /TN "TradeFlows_Daily_Blog_Post" /V /FO LIST | findstr "Last Run"
   ```

3. **Check logs for errors**:
   ```bash
   type logs\blog-generation.log
   ```

### Permission Issues

Run as Administrator:
- Right-click `schedule-blog-posts.bat`
- Select "Run as administrator"

### Node.js Not Found

Ensure Node.js is in your system PATH:
```bash
node --version
```

If not found, add Node.js installation directory to PATH.

## Best Practices

1. **Review Generated Content**: Periodically review auto-generated posts for quality
2. **Monitor Performance**: Track which keywords drive the most traffic
3. **Update Keywords**: Refresh keyword list quarterly based on search trends
4. **Backup Data**: Regularly backup `src/data/blogPosts.js`
5. **Test Changes**: Run manually before deploying template changes

## Analytics Integration

Generated blog posts automatically include:
- SEO meta tags
- Open Graph tags
- Schema.org markup
- Canonical URLs
- Internal linking

Track performance with:
- Google Analytics
- Google Search Console
- UTM parameters
- Blog traffic dashboard

## Support

Questions or issues?
- Review logs: `logs/blog-generation.log`
- Test manually: `node scripts/generateBlogPost.js`
- Check task status: `schtasks /Query /TN "TradeFlows_Daily_Blog_Post"`

---

**Note**: This system generates content automatically. Always review generated posts before deploying to production if quality control is required.
