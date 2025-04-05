import React from 'react';
import styles from './HomePage.module.css';
import Layout from '../../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <section className={styles.start}>
        <div className={styles.content}>
          <h1 className={styles.title}>FEMINE</h1>
          <p className={styles.description}>сообщество представительниц разных течений феминизма</p>
          <span></span>
          <p className={styles.description}>оффлайн в Москве | онлайн по всему миру</p>
        </div>
        
      </section>

    </Layout>
  );
};

export default HomePage;
