// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ModalContext } from '../../hooks/useModal/useModalProvider';
// import Modal from '../../components/modal/modal';
// import EventForm from '../../components/forms/EventForm';
import Layout from '../../components/layout/Layout';
// import Description from '../../components/descriptionSection/Description';
import styles from './HomePage.module.css';
import Photo1 from '../../assets/images/photo/femine-space.jpg';
import Photo2 from '../../assets/images/photo/IMG_8783.jpg';
import Photo3 from '../../assets/images/photo/IMG_8787.jpg';
import Photo4 from '../../assets/images/photo/IMG_8791.jpg';
import Photo5 from '../../assets/images/photo/IMG_8793.jpg';
import Photo6 from '../../assets/images/photo/IMG_8802.jpg';
import SlideGallery from '../../components/SlideGallery/SlideGallery';

const images: string[] = [
  Photo1, Photo2, Photo3, Photo4, Photo5, Photo6
];


const HomePage = () => {
  // const [isClicked, setIsClicked] = useState(false);
  // const [ openModal ] = useContext(ModalContext);
  // const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   setIsClicked(true);
  //   openModal(<Modal><EventForm navigate={navigate}/></Modal>)
  //   setTimeout(() => setIsClicked(false), 300); // Сбрасываем состояние через 300мс
  // };

  return (
    <Layout>
      <section className={styles.hero}>
          <SlideGallery 
            images={images}
            autoPlay={true}
            interval={4000}
            showDots={true}
          />
          {/* <div className={styles.desc}> */}
            <p className={styles.description}>пространство для&nbsp;женщин в&nbsp;Москве</p>
            {/* <p className={styles.description}>оффлайн в&nbsp;Москве | онлайн по&nbsp;всему миру</p> */}
            {/* <span></span> */}
            <h1 className={styles.title}>femine space</h1>
          {/* </div> */}
          
        
        {/* <div className={styles.content}>
          <h1 className={styles.title}>femine space</h1>
          <p className={styles.description}>пространство для&nbsp;женщин</p>
          <p className={styles.description}>оффлайн в&nbsp;Москве | онлайн по&nbsp;всему миру</p>
          <span></span>
        </div> */}
      </section>
      {/* <Description /> */}
    </Layout>
  );
};

export default HomePage;