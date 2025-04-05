import { Typography } from '@mui/material';
import styles from './EventsPage.module.css';

const EventsPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h1" gutterBottom>
        Наши мероприятия
      </Typography>
      <Typography variant="body1">
        Список предстоящих событий появится здесь скоро
      </Typography>
    </div>
  );
};

export default EventsPage;