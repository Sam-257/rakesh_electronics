import { useContent } from '../../hooks/useContent';
import { IconRenderer } from '../../utils/iconMap';
import styles from './About.module.css';

const About = () => {
  const { data: about } = useContent('about');
  const { data: aboutValues } = useContent('aboutValues');

  const paragraphs = about.storyText.split('\n\n').filter(Boolean);

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            The story behind Rakesh Electronics — three decades and counting.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <span>RE</span>
              </div>
            </div>
            <div className={styles.storyContent}>
              <h2 className={styles.storyTitle}>{about.storyTitle}</h2>
              {paragraphs.map((p, i) => (
                <p key={i} className={styles.storyText}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {aboutValues && aboutValues.length > 0 && (
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">What drives us every day.</p>
            <div className={styles.valuesGrid}>
              {aboutValues.map(({ icon, title, text }) => (
                <div key={title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <IconRenderer name={icon} />
                  </div>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueText}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
