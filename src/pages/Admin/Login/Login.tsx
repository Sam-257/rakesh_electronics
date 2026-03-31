import type { FormEvent } from 'react';
import { useState } from 'react';
import styles from './Login.module.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          setError('');
          onLogin();
        } else {
          setError('Invalid username or password');
        }
      })
      .catch(() => setError('Could not reach server'));
  }

  return (
    <div className={styles.loginWrap}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Admin Panel</h2>
        <p className={styles.loginHint}>Default credentials: admin / password</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.loginInput}
          placeholder="Username"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
          placeholder="Password"
        />
        {error && <p className={styles.loginError}>{error}</p>}
        <button type="submit" className={styles.loginBtn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
