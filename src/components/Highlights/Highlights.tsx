import { useContent } from '../../hooks/useContent';
import { IconRenderer } from '../../utils/iconMap';
import styles from './Highlights.module.css';

const Highlights = () => {
  const { data: highlights } = useContent('highlights');

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">
          Serving electronics enthusiasts, repair technicians and businesses for over 30 years.
        </p>
        <div className={styles.grid}>
          {highlights.map(({ icon, title, description }) => (
            <div key={title} className={styles.card}>
              <div className={styles.iconWrap}>
                <IconRenderer name={icon} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
