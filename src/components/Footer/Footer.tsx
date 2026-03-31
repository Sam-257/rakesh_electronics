import { NavLink } from 'react-router-dom';
import { MdElectricalServices } from 'react-icons/md';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { useContent } from '../../hooks/useContent';
import styles from './Footer.module.css';

const Footer = () => {
  const { data: info } = useContent('storeInfo');

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <NavLink to="/" className={styles.logo}>
            <MdElectricalServices className={styles.logoIcon} />
            <span>{info.shopName}</span>
          </NavLink>
          <p className={styles.tagline}>{info.tagline}</p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Quick Links</h4>
          <ul>
            <li><NavLink to="/" className={styles.footerLink}>Home</NavLink></li>
            <li><NavLink to="/products" className={styles.footerLink}>Products</NavLink></li>
            <li><NavLink to="/about" className={styles.footerLink}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={styles.footerLink}>Contact</NavLink></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contact Info</h4>
          <ul>
            <li className={styles.contactItem}>
              <HiOutlineLocationMarker />
              <span>{info.address.replace(/\n/g, ', ')}</span>
            </li>
            <li className={styles.contactItem}>
              <HiOutlinePhone />
              <span>{info.phone}</span>
            </li>
            <li className={styles.contactItem}>
              <HiOutlineMail />
              <span>{info.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} {info.shopName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
