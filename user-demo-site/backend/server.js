// ─────────────────────────────────────────────────────────────
// server.js — Application entry point
//
// Start the backend:
//   npm run dev    (development — auto-restarts on file save)
//   npm start      (production)
//
// Startup sequence:
// 1. Load .env variables
// 2. Sync Sequelize models with MySQL (creates/updates the users table)
// 3. Start HTTP server on PORT
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// sequelize.sync({ alter: true }):
//   - Creates the 'users' table if it doesn't exist
//   - Adds missing columns if the model has new fields
// WARNING: Never use { force: true } — it DROPS and recreates the table (deletes all data)
sequelize.sync({ alter: true })
  .then(() => {
    logger.info('Database synced successfully');

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
      logger.info(`Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    logger.error(`Database sync failed: ${err.message}`);
    process.exit(1);
  });
