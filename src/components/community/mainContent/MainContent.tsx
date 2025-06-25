import styles from './MainContent.module.css';
import EventCard from '../eventCard/EventCard';
import CreateEventForm from '../../forms/CreateEventForm/CreateEventForm';

const MainContent = () => {
    const communities = [
      { name: 'Marketing', members: 32 },
      { name: 'UI/UX', members: 25 }, 
      { name: 'Creative', members: 12,  },
      { name: 'Success Story', members: 35, },
      { name: 'Social network', members: 120 },
      { name: 'Technical Expert', members: 42 }
    ];

    return (
    <div className={styles.grid}>
        <CreateEventForm />
      {communities.map((comm, idx) => (
        <div
          key={idx}
        >
          <EventCard {...comm} />
        </div>
      ))}
    </div>
)};

export default MainContent;