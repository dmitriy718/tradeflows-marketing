import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import postScheduler from './scheduler/postScheduler.js';
import logger from './utils/logger.js';
import db from './database/index.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'dashboard')));

// Initialize database
await db.initialize();

// Initialize scheduler
postScheduler.start();

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Generate post manually
app.post('/api/generate-post', async (req, res) => {
  try {
    logger.info('Manual post generation requested');
    const post = await postScheduler.generatePostNow();
    res.json({ success: true, post });
  } catch (error) {
    logger.error('Error generating post:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await postScheduler.getStats();
    res.json(stats);
  } catch (error) {
    logger.error('Error getting stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent posts
app.get('/api/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const posts = await db.getRecentPosts(limit);
    res.json(posts);
  } catch (error) {
    logger.error('Error getting posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get trending keywords
app.get('/api/trending', async (req, res) => {
  try {
    const trending = await postScheduler.getTrendingKeywords();
    res.json(trending);
  } catch (error) {
    logger.error('Error getting trending keywords:', error);
    res.status(500).json({ error: error.message });
  }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(join(__dirname, 'dashboard', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Backend server running on http://localhost:${PORT}`);
  logger.info(`📊 Dashboard available at http://localhost:${PORT}/dashboard`);
  logger.info(`⏰ Post scheduler initialized and running`);

  // Log next scheduled posts
  const schedule = postScheduler.getSchedule();
  logger.info(`📅 Next posts scheduled for: ${schedule.join(', ')}`);
});