import styles from './header.module.css';

const Header = () => (
    <div className={styles.header}>
      <h2 className={styles.title}>Communities</h2>
      <div className={styles.actions}>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>
    </div>
);

export default Header;