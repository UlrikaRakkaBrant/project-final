// frontend/src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Render URL in prod, http://localhost:5000 in dev
});

// Always attach latest token before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
      // Clear any stale credentials
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Optional: be nice to the user
      // You can replace this with your toast/snackbar
      alert('Your session expired. Please log in again.');

      // Hard redirect so all state resets
      window.location.assign('/login');
    }

    return Promise.reject(err);
  }
);

export default api;
