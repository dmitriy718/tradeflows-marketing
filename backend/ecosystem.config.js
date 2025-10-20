/**
 * PM2 Configuration for TradeFlows Backend
 *
 * This configuration file tells PM2 how to run and manage the backend server.
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 stop tradeflows-backend
 *   pm2 restart tradeflows-backend
 *   pm2 logs tradeflows-backend
 *   pm2 monit
 */

module.exports = {
  apps: [
    {
      name: 'tradeflows-backend',
      script: './server.js',
      cwd: '/var/www/tradeflows/backend',

      // Instances
      instances: 1,
      exec_mode: 'fork',

      // Auto restart
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',

      // Environment variables
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },

      // Logging
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Advanced features
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,

      // Cron restart (optional - restart daily at 3 AM)
      cron_restart: '0 3 * * *',

      // Kill timeout
      kill_timeout: 5000,

      // Listen timeout
      listen_timeout: 10000,

      // Graceful shutdown
      shutdown_with_message: true
    }
  ]
};