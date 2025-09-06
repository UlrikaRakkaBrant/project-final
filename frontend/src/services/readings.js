// frontend/src/services/readings.js
import api from '../lib/api';
import { withRetry } from '../lib/retry';

// List current user's readings (with a small retry for cold starts / hiccups)
export const listReadings = (page = 1, limit = 10) =>
  withRetry(
    () => api.get('/api/readings', { params: { page, limit } }).then(r => r.data),
    { retries: 1, delay: 1200 } // try once more after ~1.2s
  );

// Create a reading
export const createReading = (payload) =>
  api.post('/api/readings', payload).then(r => r.data);

// (Optional) Get one reading (also wrapped with retry)
export const getReading = (id) =>
  withRetry(
    () => api.get(`/api/readings/${id}`).then(r => r.data),
    { retries: 1, delay: 1200 }
  );

// Update a reading
export const updateReading = (id, payload) =>
  api.patch(`/api/readings/${id}`, payload).then(r => r.data);

// Delete a reading
export const deleteReading = (id) =>
  api.delete(`/api/readings/${id}`).then(r => r.data);

