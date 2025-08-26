// frontend/src/lib/api.js
import axios from 'axios';

// One axios instance for your whole app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:5000
  // timeout: 10000, // (optional)
});

// Attach/remove the JWT to all requests made with this instance
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// (optional) Handle 401s globally
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       // e.g. redirect to /login or clear local state
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
