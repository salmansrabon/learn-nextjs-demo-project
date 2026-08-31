// services/userService.js
//
// Admin-only user management, plus the one write a normal user is allowed.
//
// Everything except updateProfilePhoto returns 403 unless the token belongs
// to an admin. That rule lives on the server in adminMiddleware — hiding a
// button in the UI is a convenience, not the security boundary.

import api from './api';

// GET /api/users?page=1&limit=10&search=  (admin)
// data: { users, total, page, limit, totalPages }
export const getAllUsers = ({ page = 1, limit = 10, search = '' } = {}) =>
  api.get('/api/users', { params: { page, limit, search } }).then((res) => res.data);

// GET /api/users/:id  (admin)
export const getUserById = (id) =>
  api.get(`/api/users/${id}`).then((res) => res.data);

// PUT /api/users/:id  (admin)
export const updateUser = (id, userData) =>
  api.put(`/api/users/${id}`, userData).then((res) => res.data);

// DELETE /api/users/:id  (admin)
export const deleteUser = (id) =>
  api.delete(`/api/users/${id}`).then((res) => res.data);

// PUT /api/users/profile/photo  (any logged-in user, own photo only)
// formData must be a FormData object with the key 'photo'.
export const updateProfilePhoto = (formData) =>
  api.put('/api/users/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data);
