import { NavLink } from 'react-router-dom';
import { FC, ReactNode, useState } from 'react';
import { ActiveLinkType } from '../../../utils/types';
import styles from './CustomNavLink.module.css';


type CustomNavLinkProps = {
    activeLinkType: ActiveLinkType;
    label: ReactNode;
    onClick?: () => void;
}

const CustomNavLink: FC<CustomNavLinkProps> = ({activeLinkType, label, onClick}) => {
    const [ isActiveNavLink, setIsActiveNavLink] = useState(false);

    const onClickHandler = () => {
        setIsActiveNavLink(true);
        if (onClick) onClick();
    }

    return (
        <li className={styles.listItem}>
            <NavLink
                aria-disabled={!isActiveNavLink}
                to={activeLinkType}
                className={({ isActive }) => !isActive ? styles.link : `${styles.link} ${styles.activeLink}`}
                onClick={onClickHandler}
            >
                {label}
            </NavLink>
        </li>
        
    )
}

export default CustomNavLink;