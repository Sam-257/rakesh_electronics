import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.spinner} />
  </div>
);

export default Loader;
