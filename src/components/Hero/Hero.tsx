import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import styles from './Hero.module.css';

const Hero = () => {
  const { data: hero } = useContent('hero');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {hero.title}{' '}
          <span className={styles.highlight}>{hero.highlight}</span>
        </h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <div className={styles.actions}>
          <Link to="/products" className={styles.btnPrimary}>
            {hero.primaryCta}
          </Link>
          <Link to="/contact" className={styles.btnSecondary}>
            {hero.secondaryCta}
          </Link>
        </div>
      </div>
      <div className={styles.decoration} aria-hidden="true">
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>
    </section>
  );
};

export default Hero;
