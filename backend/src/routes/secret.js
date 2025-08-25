// backend/src/routes/secret.js
import { Router } from 'express';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/secret (requires valid JWT)
router.get('/', auth, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, here’s your secret ✨` });
});

export default router;
