// authService.js — Functions for auth-related API calls

import api from './api';

// POST /api/auth/register
export const register = (userData) =>
  api.post('/api/auth/register', userData).then((r) => r.data);

// POST /api/auth/login — returns { success, data: { token, user } }
export const login = (credentials) =>
  api.post('/api/auth/login', credentials).then((r) => r.data);

// GET /api/auth/me — JWT in header identifies the user
export const getMe = () =>
  api.get('/api/auth/me').then((r) => r.data);

// logout — JWT is stateless, just clear localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
