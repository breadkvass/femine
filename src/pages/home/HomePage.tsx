import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import styles from './HomePage.module.css';
import Description from '../../components/descriptionSection/Description';

const HomePage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    // Здесь будет логика для обработки клика
    console.log('Кнопка "Присоединиться" была нажата');
    setTimeout(() => setIsClicked(false), 300); // Сбрасываем состояние через 300мс
  };

  return (
    <Layout>
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.call}>
            <h1 className={styles.title}>FEMINE</h1>
            <button 
              className={`${styles.buttonCall} ${isClicked ? styles.clicked : ''}`}
              onClick={handleButtonClick}
            >
              присоединиться
            </button>
          </div>
          <p className={styles.description}>сообщество для&nbsp;представительниц разных течений феминизма</p>
          <span></span>
          <p className={styles.description}>оффлайн в&nbsp;Москве | онлайн по&nbsp;всему миру</p>
        </div>
      </section>
      <Description />
    </Layout>
  );
};

export default HomePage;