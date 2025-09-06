// backend/src/routes/readings.js
import { Router } from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';
import Reading from '../models/Reading.js';

const router = Router();
const { isValidObjectId } = mongoose;

// All routes below require JWT
router.use(auth);

/**
 * CREATE a reading
 */
router.post('/', async (req, res) => {
  try {
    const { spread, title, notes, tags = [], cards = [] } = req.body;
    if (!spread) return res.status(400).json({ error: 'spread is required' });

    const reading = await Reading.create({
      userId: req.user.id,
      spread,
      title,
      notes,
      tags,
      cards,
    });

    res.status(201).json(reading);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Invalid payload' });
  }
});

/**
 * LIST your readings (paginated)
 * GET /api/readings?page=1&limit=10
 */
router.get('/', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 50);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Reading.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Reading.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
      items,
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * READ ONE (owner check)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Bad id' });

    const reading = await Reading.findById(id);
    if (!reading || String(reading.userId) !== req.user.id) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(reading);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * UPDATE (partial, owner check)
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Bad id' });

    const allowed = ['spread', 'title', 'notes', 'tags', 'cards'];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

    const reading = await Reading.findById(id);
    if (!reading || String(reading.userId) !== req.user.id) {
      return res.status(404).json({ error: 'Not found' });
    }

    Object.assign(reading, updates);
    await reading.save();
    res.json(reading);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * DELETE (owner check)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Bad id' });

    const reading = await Reading.findById(id);
    if (!reading || String(reading.userId) !== req.user.id) {
      return res.status(404).json({ error: 'Not found' });
    }

    await reading.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

