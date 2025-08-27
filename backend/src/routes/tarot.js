import { Router } from 'express';
import axios from 'axios';

const router = Router();
const BASE = process.env.TAROT_API_BASE || 'https://tarotapi.dev/api/v1';

router.get('/draw', async (req, res) => {
  try {
    const n = Number(req.query.n || 3);
    const { data } = await axios.get(`${BASE}/cards/random`, { params: { n } });
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'Tarot API failed', detail: e.message });
  }
});

router.get('/cards', async (_req, res) => {
  try {
    const { data } = await axios.get(`${BASE}/cards`);
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'Tarot API failed', detail: e.message });
  }
});

export default router;
