import { FC, memo, useEffect, useState } from 'react';
import { TRoute } from '../../../utils/types';
import CustomNavLink from '../customNavLink/CustomNavLink';
import styles from './Navigation.module.css';

type NavigationProps = {
    routes: TRoute[]
}

const Navigation: FC<NavigationProps> = ({routes}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

   useEffect(() => {  
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth >= 768) {
          setIsMenuOpen(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isMobile]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    return isMobile ? (
        <>
          <button 
            className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
            <nav>
              <ul className={styles.mobileLinks}>
                {routes.map((item, ind) => <CustomNavLink key={`${ind}-${item.route}`} activeLinkType={item.route} label={item.label} onClick={toggleMenu} />)}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <nav>
          <ul className={styles.links}>
            {routes.map((item, ind) => <CustomNavLink key={`${ind}-${item.route}`} activeLinkType={item.route} label={item.label} />)}
          </ul>
        </nav>
      )
}

export default memo(Navigation);