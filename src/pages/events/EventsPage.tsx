import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import EventForm from '../../components/forms/EventForm';
import styles from './EventsPage.module.css';

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className={styles.section}>
        <div className={styles.wavyContainer}>
          <EventForm navigate={navigate}/>
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;