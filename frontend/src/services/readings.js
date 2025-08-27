import api from '../lib/api';

export const listReadings = (page = 1, limit = 10) =>
  api.get('/api/readings', { params: { page, limit } }).then(r => r.data);

export const createReading = (payload) =>
  api.post('/api/readings', payload).then(r => r.data);

export const getReading = (id) =>
  api.get(`/api/readings/${id}`).then(r => r.data);

export const updateReading = (id, payload) =>
  api.patch(`/api/readings/${id}`, payload).then(r => r.data);

export const deleteReading = (id) =>
  api.delete(`/api/readings/${id}`).then(r => r.data);
