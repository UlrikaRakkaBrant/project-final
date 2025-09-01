// frontend/src/lib/api.js
import axios from 'axios';

const api = axios.create({
  // e.g. http://localhost:5000 (local) or your Render URL (Netlify)
  baseURL: import.meta.env.VITE_API_URL,
});

/**
 * REQUEST interceptor
 * Always attach the latest token from localStorage.
 * If it was saved via JSON.stringify, remove the quotes first.
 */
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('token');
  let token = raw;
  try {
    token = raw ? JSON.parse(raw) : null; // <-- important: removes quotes if present
  } catch {
    // raw wasn't JSON; use as-is
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * RESPONSE interceptor
 * On 401/403, clear auth and send user to /login.
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const s = err?.response?.status;
    if (s === 401 || s === 403) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch { }
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }
    return Promise.reject(err);
  }
);

export default api;
