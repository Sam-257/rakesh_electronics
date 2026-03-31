import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineClock,
} from 'react-icons/hi';
import { useContent } from '../../hooks/useContent';
import styles from './StoreLocation.module.css';

const StoreLocation = () => {
  const { data: info } = useContent('storeInfo');

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Visit Our Store</h2>
        <p className="section-subtitle">
          Located in the heart of the electronics market — walk in anytime during business hours.
        </p>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.item}>
              <HiOutlineLocationMarker className={styles.icon} />
              <div>
                <h4 className={styles.itemTitle}>Address</h4>
                <p className={styles.itemText}>
                  {info.address.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < info.address.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className={styles.item}>
              <HiOutlinePhone className={styles.icon} />
              <div>
                <h4 className={styles.itemTitle}>Phone</h4>
                <p className={styles.itemText}>{info.phone}</p>
              </div>
            </div>
            <div className={styles.item}>
              <HiOutlineClock className={styles.icon} />
              <div>
                <h4 className={styles.itemTitle}>Working Hours</h4>
                <p className={styles.itemText}>
                  {info.hours.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < info.hours.split('\n').length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.mapWrap}>
            <div className={styles.mapPlaceholder}>
              <HiOutlineLocationMarker className={styles.mapIcon} />
              <p>Google Maps embed</p>
              <p className={styles.mapHint}>Replace this with an actual Google Maps iframe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
