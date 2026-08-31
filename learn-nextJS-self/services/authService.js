// services/authService.js
//
// Auth calls in one file. Pages import these instead of knowing URLs.

import api from './api';

// POST /api/auth/register — no token needed, anyone can register.
export const register = (userData) =>
  api.post('/api/auth/register', userData).then((res) => res.data);

// POST /api/auth/login — returns { success, message, data: { token, user } }
export const login = (credentials) =>
  api.post('/api/auth/login', credentials).then((res) => res.data);

// GET /api/auth/me — the token alone identifies the user, so no id is sent.
// This is the call a normal user relies on: it returns their own record and
// nobody else's.
export const getMe = () =>
  api.get('/api/auth/me').then((res) => res.data);
