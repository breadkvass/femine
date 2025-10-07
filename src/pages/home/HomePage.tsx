import { mainImages } from '../../utils/images';
import Layout from '../../components/layout/Layout';
import SlideGallery from '../../components/SlideGallery/SlideGallery';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <SlideGallery 
          images={mainImages}
          autoPlay={true}
          interval={4000}
          showDots={true}
        />
        <p className={styles.description}>пространство для&nbsp;женщин в&nbsp;Москве</p>
        <h1 className={styles.title}>femine space</h1>
      </section>
    </Layout>
  );
};

export default HomePage;