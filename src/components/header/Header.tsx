import { useState, useEffect } from 'react';
import logoWhite from '../../assets/images/logo-white.png';
import CustomNavLink from './customNavLink/CustomNavLink';
import styles from './Header.module.css';
import Navigation from './navigation/Navigation';
import { TRoute } from '../../utils/types';

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
    { route: '/about', label: 'о нас' },
    { route: '/events', label: 'мероприятия' },
    { route: '/contacts', label: 'контакты' },
    { route: '/superwomen', label: 'база специалисток' }
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