// backend/server.js
// force .env to override any OS env var
import dotenv from 'dotenv';
dotenv.config({ override: true });
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRouter from './src/routes/auth.js';
import secretRouter from './src/routes/secret.js';
import readingsRouter from './src/routes/readings.js';
import tarotRouter from './src/routes/tarot.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI missing in backend/.env');
  process.exit(1);
}

const app = express();

// --- CORS (dev + production) -----------------------------------------------
const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
];

// Allow comma-separated env (ex: "https://pocketoracle.netlify.app,http://localhost:5173")
const ENV_ORIGINS = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const ALLOWED_ORIGINS = ENV_ORIGINS.length ? ENV_ORIGINS : DEV_ORIGINS;

const corsOptions = {
  origin(origin, cb) {
    // allow curl/health checks (no Origin) and any listed origin
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin not allowed -> ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 86400,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Make sure every route responds to preflight
app.options('*', cors(corsOptions));
// ---------------------------------------------------------------------------

app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/secret', secretRouter);
app.use('/api/readings', readingsRouter);
app.use('/api/tarot', tarotRouter);

// Demo root
app.get('/', (_req, res) => {
  res.send('Hello Technigo!');
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✓ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log('✓ CORS allowed origins:', (ALLOWED_ORIGINS || []).join(', '));
    });

  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
}

start();

