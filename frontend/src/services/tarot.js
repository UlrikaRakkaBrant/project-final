// frontend/src/services/tarot.js
import api from '../lib/api'; // your axios instance that prefixes VITE_API_URL

// GET /api/tarot/draw?n=3  → returns { cards: [...] } (or sometimes just an array)
// We'll normalize in the page.
export const drawRandom = (n = 3) =>
  api.get('/api/tarot/draw', { params: { n } }).then(r => r.data);

// (optional) list all cards if you want it later
export const listAllCards = () =>
  api.get('/api/tarot/cards').then(r => r.data);

