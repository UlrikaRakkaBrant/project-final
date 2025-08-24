// backend/server.js
import 'dotenv/config';               // keep this FIRST
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;        // use MONGODB_URI (matches your .env)
const ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI missing in backend/.env');
  process.exit(1);
}

const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(express.json());

// simple health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// demo route (keep if you want)
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
