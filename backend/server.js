// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.js';
import secretRouter from './src/routes/secret.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI missing in backend/.env');
  process.exit(1);
}

const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use('/api/secret', secretRouter);

// health (keep this, or replace with a healthRouter if you made one)
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// mount auth routes
app.use('/api/auth', authRouter);

// demo
app.get('/', (_req, res) => {
  res.send('Hello Technigo!');
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
}

start();
