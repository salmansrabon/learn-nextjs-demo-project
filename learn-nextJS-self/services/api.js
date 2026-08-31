// services/api.js
//
// The single axios instance every service file uses.
//
// Two interceptors do the work that would otherwise be repeated at every
// call site: one attaches the token to every request, one reacts to an
// expired token on every response.

import axios from 'axios';
import { API_URL } from '@/lib/apiConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// REQUEST INTERCEPTOR — runs before every request leaves the browser.
api.interceptors.request.use((config) => {
  // localStorage exists only in the browser. Without this guard the call
  // would throw during server rendering.
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR — runs on every response, success or failure.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 means the token is missing, expired or invalid. Clear it so the
    // next page does not keep retrying with a token the server rejects.
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    // Re-reject so the calling page can still show its own message.
    return Promise.reject(error);
  }
);

export default api;
