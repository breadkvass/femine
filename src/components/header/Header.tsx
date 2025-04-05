import logoWhite from '../../../public/logo-white.png';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logoWhite} alt='Логотип' />
      <nav>
        <ul className={styles.links}>
          <NavLink aria-disabled to={'/about'}>о нас</NavLink>
          <NavLink aria-disabled to={'/events'}>мероприятия</NavLink>
          <NavLink aria-disabled to={'/contacts'}>контакты</NavLink>
          <NavLink aria-disabled to={'/superwomen'}>база специалисток</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;