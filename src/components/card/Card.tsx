import { FC, ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
    children: ReactNode;
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
}

const Card: FC<CardProps> = ({ children, width, height, backgroundColor }) => {
    const cardStyle = {
        ...(width && { width }),
        ...(height && { height }),
        ...(backgroundColor && { backgroundColor }),
    };

    return (
        <div className={styles.card} style={cardStyle}>
            {children}
        </div>
    )
}

export default Card;