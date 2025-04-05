import { useState, useEffect } from 'react';
import logoWhite from '../../assets/images/logo-white.png';
import CustomNavLink from './customNavLink/customNavLink';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.content}>
        <CustomNavLink
          activeLinkType='/'
          label={ <img className={styles.logo} src={logoWhite} alt='Логотип' />}
        />
        
        <nav>
          <ul className={styles.links}>
            <CustomNavLink activeLinkType='/about' label='о нас' />
            <CustomNavLink activeLinkType='/events' label='мероприятия' />
            <CustomNavLink activeLinkType='/contacts' label='контакты' />
            <CustomNavLink activeLinkType='/superwomen' label='база специалисток' />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;