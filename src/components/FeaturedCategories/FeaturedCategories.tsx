import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { IconRenderer } from '../../utils/iconMap';
import styles from './FeaturedCategories.module.css';

const FeaturedCategories = () => {
  const { data: categories } = useContent('categories');

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">
          We stock a wide range of electronic spare parts and components for every project.
        </p>
        <div className={styles.grid}>
          {categories.map(({ icon, label, color }) => (
            <Link to="/products" key={label} className={styles.card}>
              <div className={styles.iconWrap} style={{ backgroundColor: `${color}15`, color }}>
                <IconRenderer name={icon} />
              </div>
              <span className={styles.label}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
