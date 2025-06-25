import { FC, ReactNode } from 'react';
import Logo from '../../../assets/images/logo-black.png'
import styles from './Sidebar.module.css'

type SidebarProps = {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({children}) => (
  <div className={styles.sidebar}>
    <img src={Logo} />
    <div className={styles.userSection}>
      <span>Hi Liyana</span>
    </div>
    {children}
  </div>
);

  export default Sidebar;