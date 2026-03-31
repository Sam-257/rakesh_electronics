import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
