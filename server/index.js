import express from 'express';
import db from './db.js';
import contentRouter from './routes/content.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(express.json({ limit: '2mb' }));

/* ── Routes ─────────────────────────────────────── */

app.use('/api/content', contentRouter);
app.use('/api/auth', authRouter);

/* ── Graceful shutdown ────────────────────────────── */

process.on('SIGINT', () => { db.close(); process.exit(0); });
process.on('SIGTERM', () => { db.close(); process.exit(0); });

/* ── Start ────────────────────────────────────────── */

app.listen(PORT, () => {
  console.log(`CMS API server running on http://localhost:${PORT} (SQLite)`);
});
