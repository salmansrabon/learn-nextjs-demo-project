// lib/apiConfig.js
//
// One place that knows where the backend lives. Every service file imports
// from here, so moving the API means editing one line.
//
// The NEXT_PUBLIC_ prefix is required: without it the value is server-only
// and reads as undefined inside a Client Component.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
