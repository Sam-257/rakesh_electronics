import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { defaults } from './data/defaults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, 'data');
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, 'cms.db'));

db.pragma('journal_mode = WAL');

/* ── Schema ───────────────────────────────────────── */

db.exec(`
  DROP TABLE IF EXISTS content;

  CREATE TABLE IF NOT EXISTS hero (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    title TEXT NOT NULL,
    highlight TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    primaryCta TEXT NOT NULL,
    secondaryCta TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS storeInfo (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    shopName TEXT NOT NULL,
    tagline TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    hours TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS about (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    storyTitle TEXT NOT NULL,
    storyText TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS aboutValues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL,
    label TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#3b82f6'
  );

  CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT '',
    text TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL,
    price REAL NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS auth (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT NOT NULL DEFAULT 'admin',
    password TEXT NOT NULL DEFAULT 'password'
  );

  CREATE TABLE IF NOT EXISTS theme (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    colorPrimary TEXT NOT NULL DEFAULT '#2563eb',
    colorPrimaryDark TEXT NOT NULL DEFAULT '#1d4ed8',
    colorPrimaryLight TEXT NOT NULL DEFAULT '#dbeafe',
    colorSecondary TEXT NOT NULL DEFAULT '#0f172a',
    colorAccent TEXT NOT NULL DEFAULT '#f59e0b',
    colorText TEXT NOT NULL DEFAULT '#1e293b',
    colorTextLight TEXT NOT NULL DEFAULT '#64748b',
    colorBg TEXT NOT NULL DEFAULT '#ffffff',
    colorBgAlt TEXT NOT NULL DEFAULT '#f8fafc',
    colorBorder TEXT NOT NULL DEFAULT '#e2e8f0',
    heroGradientStart TEXT NOT NULL DEFAULT '#0f172a',
    heroGradientMid TEXT NOT NULL DEFAULT '#1e3a5f',
    heroGradientEnd TEXT NOT NULL DEFAULT '#2563eb',
    headerGradientStart TEXT NOT NULL DEFAULT '#0f172a',
    headerGradientEnd TEXT NOT NULL DEFAULT '#1e3a5f',
    footerBg TEXT NOT NULL DEFAULT '#0f172a'
  );
`);

/* ── Migrations ───────────────────────────────────── */

const authColumns = db.prepare("PRAGMA table_info(auth)").all().map((c) => c.name);
if (!authColumns.includes('username')) {
  db.exec(`ALTER TABLE auth ADD COLUMN username TEXT NOT NULL DEFAULT 'admin'`);
}

// Seed default auth row (after migrations so username column exists)
db.prepare('INSERT OR IGNORE INTO auth (id, username, password) VALUES (1, ?, ?)')
  .run('admin', bcrypt.hashSync('password', 10));

// Migrate plaintext passwords to bcrypt hashes
const authRow = db.prepare('SELECT password FROM auth WHERE id = 1').get();
if (authRow && !authRow.password.startsWith('$2')) {
  const hashed = bcrypt.hashSync(authRow.password, 10);
  db.prepare('UPDATE auth SET password = ? WHERE id = 1').run(hashed);
}

/* ── Table config ─────────────────────────────────── */

export const tables = {
  hero:         { type: 'object', columns: ['title', 'highlight', 'subtitle', 'primaryCta', 'secondaryCta'] },
  storeInfo:    { type: 'object', columns: ['shopName', 'tagline', 'address', 'phone', 'email', 'hours'] },
  about:        { type: 'object', columns: ['storyTitle', 'storyText'] },
  aboutValues:  { type: 'list',   columns: ['icon', 'title', 'text'] },
  categories:   { type: 'list',   columns: ['icon', 'label', 'color'] },
  highlights:   { type: 'list',   columns: ['icon', 'title', 'description'] },
  testimonials: { type: 'list',   columns: ['name', 'role', 'text'] },
  products:     { type: 'list',   columns: ['name', 'description', 'category', 'price'] },
  theme:        { type: 'object', columns: ['colorPrimary', 'colorPrimaryDark', 'colorPrimaryLight', 'colorSecondary', 'colorAccent', 'colorText', 'colorTextLight', 'colorBg', 'colorBgAlt', 'colorBorder', 'heroGradientStart', 'heroGradientMid', 'heroGradientEnd', 'headerGradientStart', 'headerGradientEnd', 'footerBg'] },
};

/* ── Data helpers ─────────────────────────────────── */

export function getData(key) {
  const config = tables[key];
  if (!config) return null;

  if (config.type === 'object') {
    const cols = config.columns.join(', ');
    const row = db.prepare(`SELECT ${cols} FROM "${key}" WHERE id = 1`).get();
    return row || null;
  }

  const cols = ['id', ...config.columns].join(', ');
  return db.prepare(`SELECT ${cols} FROM "${key}" ORDER BY id`).all();
}

export function setData(key, value) {
  const config = tables[key];
  if (!config) return;

  if (config.type === 'object') {
    const sets = config.columns.map((c) => `${c} = ?`).join(', ');
    const vals = config.columns.map((c) => value[c] ?? '');
    // Upsert: try update, if no row exists then insert
    const updated = db.prepare(`UPDATE "${key}" SET ${sets} WHERE id = 1`).run(...vals);
    if (updated.changes === 0) {
      const cols = config.columns.join(', ');
      const placeholders = config.columns.map(() => '?').join(', ');
      db.prepare(`INSERT INTO "${key}" (id, ${cols}) VALUES (1, ${placeholders})`).run(...vals);
    }
  } else {
    const cols = config.columns.join(', ');
    const placeholders = config.columns.map(() => '?').join(', ');
    const insert = db.prepare(`INSERT INTO "${key}" (${cols}) VALUES (${placeholders})`);
    db.transaction((items) => {
      db.prepare(`DELETE FROM "${key}"`).run();
      for (const item of items) {
        insert.run(...config.columns.map((c) => item[c] ?? ''));
      }
    })(Array.isArray(value) ? value : []);
  }
}

export function resetData(key) {
  const config = tables[key];
  if (!config) return;

  if (config.type === 'object') {
    db.prepare(`DELETE FROM "${key}"`).run();
  } else {
    db.prepare(`DELETE FROM "${key}"`).run();
  }
  // Re-seed from defaults
  setData(key, defaults[key]);
}

/* ── Seed defaults into empty tables ──────────────── */

for (const key of Object.keys(tables)) {
  const count = db.prepare(`SELECT COUNT(*) AS cnt FROM "${key}"`).get().cnt;
  if (count === 0 && defaults[key]) {
    setData(key, defaults[key]);
  }
}

/* ── Auth statements ──────────────────────────────── */

export const authStmts = {
  getAuth: db.prepare('SELECT username, password FROM auth WHERE id = 1'),
  setPassword: db.prepare('UPDATE auth SET password = ? WHERE id = 1'),
};

export default db;
