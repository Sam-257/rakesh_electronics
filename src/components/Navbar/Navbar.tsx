import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { MdElectricalServices } from 'react-icons/md';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <MdElectricalServices className={styles.logoIcon} />
          <span>Rakesh Electronics</span>
        </NavLink>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        <ul id="nav-menu" className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
