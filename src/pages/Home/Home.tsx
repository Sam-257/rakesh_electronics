import Hero from '../../components/Hero/Hero';
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories';
import Highlights from '../../components/Highlights/Highlights';
import Testimonials from '../../components/Testimonials/Testimonials';
import StoreLocation from '../../components/StoreLocation/StoreLocation';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <Highlights />
      <Testimonials />
      <StoreLocation />
    </>
  );
};

export default Home;
