import { HiOutlineStar } from 'react-icons/hi';
import { useContent } from '../../hooks/useContent';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const { data: testimonials } = useContent('testimonials');

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Don&apos;t just take our word for it — hear from the people who trust us.
        </p>
        <div className={styles.grid}>
          {testimonials.map(({ name, role, text }) => (
            <div key={name} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar key={i} />
                ))}
              </div>
              <p className={styles.text}>&ldquo;{text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{name.charAt(0)}</div>
                <div>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.role}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
