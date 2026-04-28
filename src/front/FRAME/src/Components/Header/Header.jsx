import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <aside className={styles.sidebar}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className={styles.logoContainer}>
          <span className={styles.logoFrame}>FRAME</span>
          <span className={styles.logoTech}>TECH</span>
        </div>

        <nav className={styles.navGroup}>
          <button className={styles.iconButton}>X</button>
          <button className={styles.iconButton}>X</button>
          <button className={styles.iconButton}>X</button>
          <button className={styles.iconButton}>X</button>
          <button className={styles.iconButton}>X</button>
          <button className={styles.iconButton}>X</button>
        </nav>
      </div>

      <div>
        <button className={styles.profileIcon}>
          X
        </button>
      </div>
    </aside>
  );
};

export default Header;