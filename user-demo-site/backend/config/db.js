// ─────────────────────────────────────────────────────────────
// db.js — Creates and exports the Sequelize database connection
// Think of this as the "phone line" to MySQL.
// All other files import this to talk to the database.
// ─────────────────────────────────────────────────────────────

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize connection using our environment variables
// Parameters: (databaseName, username, password, options)
const sequelize = new Sequelize(
  process.env.DB_NAME,      // "miniapp1"
  process.env.DB_USER,      // "root"
  process.env.DB_PASSWORD,  // your MySQL password
  {
    host: process.env.DB_HOST,  // "localhost"
    dialect: 'mysql',           // tell Sequelize we're using MySQL
    logging: false,             // set to console.log to see SQL queries
  }
);

module.exports = sequelize;
