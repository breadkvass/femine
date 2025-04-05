import { FC, ReactNode } from 'react';
import styles from './Layout.module.css';
import Header from '../header/Header';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header />
            {children}
        </div>
    )
}

export default Layout;