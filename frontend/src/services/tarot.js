// frontend/src/services/tarot.js
import api from '../lib/api'; // axios instance that prefixes VITE_API_URL

// Basic endpoints (you already had these)
export const drawRandom = (n = 3) =>
  api.get('/api/tarot/draw', { params: { n } }).then(r => r.data);

export const listAllCards = () =>
  api.get('/api/tarot/cards').then(r => r.data);

// --- NEW helpers below ---

// tarotapi.dev sometimes returns { cards: [...] } and sometimes just [...]
const normalize = (data) => Array.isArray(data) ? data : (data?.cards || []);

// Draw exactly one card and randomly mark it reversed (50/50)
export const drawOneCard = async () => {
  const list = normalize(await drawRandom(1));
  const c = list[0];
  if (!c) return null;
  return { ...c, reversed: Math.random() < 0.5 };
};

// Draw three cards and randomly mark each reversed
export const drawThreeCards = async () => {
  const list = normalize(await drawRandom(3));
  return list.map(c => ({ ...c, reversed: Math.random() < 0.5 }));
};
