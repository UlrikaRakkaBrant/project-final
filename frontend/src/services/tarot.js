// frontend/src/services/tarot.js
import api from '../lib/api';              // axios instance
import { withRetry } from '../lib/retry';  // <-- NEW

// tarotapi.dev sometimes returns { cards: [...] } and sometimes just [...]
const normalize = (data) => (Array.isArray(data) ? data : (data?.cards || []));

// Internal helper: draw N with a small retry (helps on cold-starts/timeouts)
const drawRaw = (n = 3) =>
  withRetry(
    () => api.get('/api/tarot/draw', { params: { n } }).then((r) => r.data),
    { retries: 1, delay: 1200 } // try once more after ~1.2s
  );

// Public APIs you use elsewhere
export const drawRandom = async (n = 3) => normalize(await drawRaw(n));

export const listAllCards = () =>
  withRetry(
    () => api.get('/api/tarot/cards').then((r) => r.data),
    { retries: 1, delay: 1200 }
  );

// Draw exactly one card and randomly mark it reversed (50/50)
export const drawOneCard = async () => {
  const list = await drawRandom(1);
  const c = list[0];
  if (!c) return null;
  return { ...c, reversed: Math.random() < 0.5 };
};

// Draw three cards and randomly mark each reversed
export const drawThreeCards = async () => {
  const list = await drawRandom(3);
  return list.map((c) => ({ ...c, reversed: Math.random() < 0.5 }));
};
