// frontend/src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Always attach the latest token from localStorage (un-stringify if needed)
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('token');
  let token = raw;
  try {
    // If it was stored via JSON.stringify, this removes the quotes.
    token = raw ? JSON.parse(raw) : null;
  } catch {
    // raw wasn't JSON – that's fine, use as-is
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

