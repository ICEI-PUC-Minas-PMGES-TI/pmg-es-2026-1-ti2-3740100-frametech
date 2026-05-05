import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

import {
  Home,
  BarChart3,
  User,
  LogIn,
  UserPlus,
  Settings
} from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div className={styles.logoContainer}>
          <span className={styles.logoFrame}>FRAME</span>
          <span className={styles.logoTech}>TECH</span>
        </div>

        <nav className={styles.navGroup}>

          <button className={styles.iconButton} onClick={() => navigate("/")}>
            <Home size={20} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate("/home-cliente")}>
            <BarChart3 size={20} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate("/perfil")}>
            <User size={20} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate("/login")}>
            <LogIn size={20} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate("/cadastro")}>
            <UserPlus size={20} />
          </button>

          <button className={styles.iconButton} onClick={() => navigate("/configuracoes")}>
            <Settings size={20} />
          </button>

        </nav>
      </div>

      <div>
        <button
          className={styles.profileIcon}
          onClick={() => navigate("/perfil")}
        >
          <User size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Header;