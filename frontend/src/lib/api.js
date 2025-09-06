// frontend/src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Render URL in prod, http://localhost:5000 in dev
});

// --- Request interceptor: attach token only where needed ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Resolve a clean pathname regardless of relative/absolute URL
  // (works even if config.url is '/api/...' or 'http...').
  const base = api.defaults.baseURL || window.location.origin;
  const full = new URL(config.url, base);
  const path = full.pathname;

  // Public paths that do NOT need auth:
  const isPublic =
    path.startsWith('/api/tarot') || // public tarot proxy
    path === '/health';              // health check

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Be explicit: ensure it's not sent to public endpoints
    delete config.headers.Authorization;
  }

  return config;
});

// --- Response interceptor: handle auth failures globally ---
let redirecting = false; // prevent redirect loops

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;

    // 401 (unauthenticated) or 403 (forbidden) → log out + send to /login
    if ((status === 401 || status === 403) && !redirecting) {
      redirecting = true;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Your session expired. Please log in again.');
      window.location.assign('/login');
    }

    return Promise.reject(err);
  }
);

export default api;

