import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { authStmts } from '../db.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const row = authStmts.getAuth.get();
  if (username === row.username && bcrypt.compareSync(password, row.password)) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false, error: 'Invalid username or password' });
  }
});

router.put('/password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const row = authStmts.getAuth.get();
  if (!bcrypt.compareSync(currentPassword, row.password)) {
    return res.status(401).json({ ok: false, error: 'Current password is incorrect' });
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ ok: false, error: 'Password must be at least 4 characters' });
  }
  authStmts.setPassword.run(bcrypt.hashSync(newPassword, 10));
  res.json({ ok: true });
});

export default router;
