import { NavLink } from 'react-router-dom';
import { FC, ReactNode, useState } from 'react';
import styles from './CustomNavLink.module.css';

type ActiveLinkType = '/' | '/about' | '/events' | '/contacts' | '/superwomen';

type CustomNavLinkProps = {
    activeLinkType: ActiveLinkType;
    label: ReactNode;
}

const CustomNavLink: FC<CustomNavLinkProps> = ({activeLinkType, label}) => {
    const [activeNavLink, setActiveNavLink] = useState<ActiveLinkType>('/')

    const setActiveStyle = (isActive: boolean, link: ActiveLinkType) => {
        setActiveNavLink(link);
        return !isActive ? styles.link : `${styles.link} ${styles.activeLink}`
    };

    return (
        <li className={styles.listItem}>
            <NavLink
                aria-disabled={activeNavLink === activeLinkType}
                to={activeLinkType}
                className={({ isActive }) => setActiveStyle(isActive, activeLinkType)}
            >
                {label}
            </NavLink>
        </li>
        
    )
}

export default CustomNavLink;