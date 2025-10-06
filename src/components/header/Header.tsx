import { useState, useEffect } from 'react';
import { TRoute } from '../../utils/types';
import logoWhite from '../../assets/images/logo.png';
import CustomNavLink from './customNavLink/CustomNavLink';
import Navigation from './navigation/Navigation';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const routes: TRoute[] = [
    { route: '/events', label: 'записаться на наши мероприятия' },
    // { route: '/contacts', label: 'контакты' },
    // { route: '/auth', label: 'присоединиться' }
  ]

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.content}>
        <CustomNavLink
          activeLinkType='/'
          label={<img className={styles.logo} src={logoWhite} alt='Логотип' />}
        />
        <Navigation routes={routes} />
      </div>
    </header>
  );
};

export default Header;