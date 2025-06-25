import { FC } from 'react';
import styles from './EventCard.module.css';

type EventCardProps = {
    name: string;
    members: number;
    image?: string;
}

const EventCard: FC<EventCardProps> = ({ name, members, image }) => (
    <div className={styles.card}>
      {image && <img src={image} alt={name} className={styles.image} />}
      <div className={styles.infoSection}>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.members}>{members} members</div>
      <button className={styles.joinButton}>Join Community</button>
    </div>
);

export default EventCard;