import { useState, useMemo } from 'react';
import { useContent } from '../../hooks/useContent';
import styles from './Products.module.css';

const Products = () => {
  const { data: products } = useContent('products');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Our Products</h1>
          <p className={styles.subtitle}>
            Browse our catalogue of electronic spare parts and components.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imagePlaceholder}>
                  <span>{product.category.charAt(0)}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.price}>&#8377;{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>No products found in this category.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
