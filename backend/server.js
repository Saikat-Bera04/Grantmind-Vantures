import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db.js';
import apiRouter from './api/routes/index.js';

const app = express();

// Middlewares
// Configure CORS: allow localhost (any port) and an explicit allowlist from CORS_ORIGIN
const allowlist = ('http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const localhostRegex = /^http:\/\/localhost(?::\d+)?$/i;
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    const isLocalhost = localhostRegex.test(origin);
    const isAllowed = allowlist.includes(origin) || isLocalhost;
    if (isAllowed) return callback(null, true);
    console.warn('[CORS] Blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
};
app.use(cors(corsOptions));
// Enable preflight across the board
app.options('*', cors(corsOptions));
console.log('[CORS] Allowlist:', allowlist, ' | Localhost allowed on any port');
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// API routes
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
