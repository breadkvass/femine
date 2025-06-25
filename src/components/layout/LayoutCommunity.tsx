import { FC, ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutCommunityProps = {
    children: ReactNode;
}

const LayoutCommunity: FC<LayoutCommunityProps> = ({children}) => {
    return (
        <div className={styles.layoutPortal}>
            <div style={{height: 80, width: '100%'}}></div>
            {children}
        </div>
    )
}

export default LayoutCommunity;