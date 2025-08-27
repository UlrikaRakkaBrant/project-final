// backend/src/routes/readings.js
import { Router } from 'express';
import auth from '../middleware/auth.js';
import Reading from '../models/Reading.js';

const router = Router();

// All routes below require JWT
router.use(auth);

// CREATE
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
    res.status(400).json({ error: e.message });
  }
});

// LIST (own), with simple pagination
router.get('/', async (req, res) => {
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
    pages: Math.ceil(total / limit),
    items,
  });
});

// READ ONE (owner check)
router.get('/:id', async (req, res) => {
  const reading = await Reading.findById(req.params.id);
  if (!reading || String(reading.userId) !== req.user.id) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(reading);
});

// UPDATE (owner check) — partial
router.patch('/:id', async (req, res) => {
  const allowed = ['spread', 'title', 'notes', 'tags', 'cards'];
  const updates = {};
  for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

  const reading = await Reading.findById(req.params.id);
  if (!reading || String(reading.userId) !== req.user.id) {
    return res.status(404).json({ error: 'Not found' });
  }

  Object.assign(reading, updates);
  await reading.save();
  res.json(reading);
});

// DELETE (owner check)
router.delete('/:id', async (req, res) => {
  const reading = await Reading.findById(req.params.id);
  if (!reading || String(reading.userId) !== req.user.id) {
    return res.status(404).json({ error: 'Not found' });
  }
  await reading.deleteOne();
  res.json({ message: 'Deleted' });
});

export default router;
