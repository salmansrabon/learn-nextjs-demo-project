// ─────────────────────────────────────────────────────────────
// authRoutes.js — URL endpoints for authentication
//
// Mounted at /api/auth in app.js. Full URLs:
//   POST /api/auth/register
//   POST /api/auth/login
//   GET  /api/auth/me
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/auth/register — no auth needed, anyone can register
router.post('/register', authController.register);

// POST /api/auth/login — no auth needed
router.post('/login', authController.login);

// GET /api/auth/me — must be logged in (authMiddleware checks the JWT)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
