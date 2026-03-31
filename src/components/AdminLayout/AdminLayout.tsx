import { useState, useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { sections } from '../../pages/Admin/sections';
import Login from '../../pages/Admin/Login/Login';
import styles from './AdminLayout.module.css';

const ADMIN_AUTH_KEY = 'rakesh_cms_auth';

const AdminLayout = () => {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(ADMIN_AUTH_KEY) === '1'
  );
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  function handleLogin() {
    sessionStorage.setItem(ADMIN_AUTH_KEY, '1');
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setAuthed(false);
  }

  function handleChangePassword() {
    const currentPw = window.prompt('Enter current password:');
    if (!currentPw) return;
    const newPw = window.prompt('Enter new admin password:');
    if (newPw && newPw.length >= 4) {
      fetch('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      })
        .then((res) => {
          if (res.ok) showToast('Password updated');
          else return res.json().then((d) => alert(d.error || 'Failed to update password'));
        })
        .catch(() => alert('Could not reach server'));
    } else if (newPw !== null) {
      alert('Password must be at least 4 characters.');
    }
  }

  if (!authed) return <Login onLogin={handleLogin} />;

  return (
    <div className={styles.admin}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>CMS</h2>
        <nav className={styles.sidebarNav}>
          {sections.map((s) => (
            <NavLink
              key={s.key}
              to={`/admin/${s.path}`}
              className={({ isActive }) =>
                `${styles.tabBtn} ${isActive ? styles.tabActive : ''}`
              }
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleChangePassword} className={styles.sidebarLink}>
            Change Password
          </button>
          <button onClick={handleLogout} className={styles.sidebarLink}>
            Log Out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet context={{ showToast }} />
      </main>
    </div>
  );
};

export default AdminLayout;
