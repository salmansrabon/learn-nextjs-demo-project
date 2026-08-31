// userService.js — Functions for user CRUD API calls

import api from './api';

// GET /api/users?page=1&limit=10&search=...
export const getAllUsers = ({ page = 1, limit = 10, search = '' } = {}) =>
  api.get('/api/users', { params: { page, limit, search } }).then((r) => r.data);

// GET /api/users/:id
export const getUserById = (id) =>
  api.get(`/api/users/${id}`).then((r) => r.data);

// PUT /api/users/:id
export const updateUser = (id, userData) =>
  api.put(`/api/users/${id}`, userData).then((r) => r.data);

// DELETE /api/users/:id
export const deleteUser = (id) =>
  api.delete(`/api/users/${id}`).then((r) => r.data);

// PUT /api/users/profile/photo — formData must be a FormData object with key 'photo'
export const updateProfilePhoto = (formData) =>
  api.put('/api/users/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
