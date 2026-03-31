import { Router } from 'express';
import { tables, getData, setData, resetData } from '../db.js';

const router = Router();

router.get('/:key', (req, res) => {
  const { key } = req.params;
  if (!(key in tables)) return res.json({ data: null });
  res.json({ data: getData(key) });
});

router.put('/:key', (req, res) => {
  const { key } = req.params;
  if (!(key in tables)) return res.status(404).json({ ok: false, error: 'Unknown content key' });
  setData(key, req.body.value);
  res.json({ ok: true });
});

router.delete('/:key', (req, res) => {
  const { key } = req.params;
  if (!(key in tables)) return res.status(404).json({ ok: false, error: 'Unknown content key' });
  resetData(key);
  res.json({ ok: true });
});

export default router;
