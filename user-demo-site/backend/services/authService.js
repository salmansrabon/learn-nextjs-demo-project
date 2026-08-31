// ─────────────────────────────────────────────────────────────
// authService.js — Business logic for authentication
//
// register() — create a new user account
// login()    — verify credentials and return a JWT token
// getMe()    — fetch the currently logged-in user's data
// ─────────────────────────────────────────────────────────────

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ── REGISTER ──────────────────────────────────────────────────

const register = async ({ firstname, lastname, email, phonenumber, password }) => {
  // Check if this email is already registered
  const existing = await User.findOne({ where: { email } });

  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 409; // 409 Conflict
    throw err;
  }

  // Hash the password BEFORE saving — never store plain text passwords
  // Salt rounds = 10: good balance between security and speed
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user
  const user = await User.create({
    firstname,
    lastname,
    email,
    phonenumber: phonenumber || null,
    password: hashedPassword,
    role: 'user', // new registrations are always 'user', never 'admin'
  });

  // Return only safe fields (never return the password)
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
};

// ── LOGIN ─────────────────────────────────────────────────────

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    // Generic message — don't reveal whether the email exists or not
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // bcrypt.compare() hashes the input and compares with stored hash
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  // Create a JWT token — stores { id, email, role } as payload
  // The frontend stores this token and sends it with every protected request
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  // Remove password from the response object
  const userObj = user.toJSON();
  delete userObj.password;
  return { token, user: userObj };
};

// ── GET ME ────────────────────────────────────────────────────

const getMe = async (userId) => {
  // findByPk = "find by Primary Key" (the id column)
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }, // don't select the password column
  });

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  return user;
};

module.exports = { register, login, getMe };
