import Layout from '../../components/layout/Layout';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>FEMINE</h1>
          <p className={styles.description}>сообщество для представительниц разных течений феминизма</p>
          <span></span>
          <p className={styles.description}>оффлайн в Москве | онлайн по всему миру</p>
        </div>
      </section>
      <section className={styles.points}>
        <div className={styles.content}>

        </div>
      </section>

    </Layout>
  );
};

export default HomePage;
