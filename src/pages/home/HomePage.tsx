import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import Modal from '../../components/modal/modal';
import EventForm from '../../components/forms/eventForm/eventForm';
import Layout from '../../components/layout/Layout';
import Description from '../../components/descriptionSection/Description';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [ openModal ] = useContext(ModalContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsClicked(true);
    openModal(<Modal><EventForm navigate={navigate}/></Modal>)
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