import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

import {
  Home,
  BarChart3,
  User,
  LogIn,
  UserPlus,
  Settings,
  LogOut
} from 'lucide-react';

const Header = () => {

  const navigate = useNavigate();

  const usuarioLogado =
    sessionStorage.getItem("usuarioId");

  const verificarAcesso = (rota) => {

    if (rota === "/login" || rota === "/cadastro") {
      navigate(rota);
      return;
    }

    if (!usuarioLogado) {

      alert(
        "Você precisa fazer login ou cadastro primeiro."
      );

      navigate("/login");

      return;
    }

    navigate(rota);
  };

  const verificarHome = () => {

    if (!usuarioLogado) {

      navigate("/");

      return;
    }

    navigate("/home-cliente");
  };

  const sair = () => {

    sessionStorage.removeItem("usuarioId");
    sessionStorage.removeItem("tipoUsuario");

    navigate("/login");
  };

  return (

    <aside className={styles.sidebar}>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >

        <div className={styles.logoContainer}>

          <span className={styles.logoFrame}>
            FRAME
          </span>

          <span className={styles.logoTech}>
            TECH
          </span>

        </div>

        <nav className={styles.navGroup}>

          <button
            className={styles.iconButton}
            onClick={verificarHome}
          >
            <Home size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={verificarHome}
          >
            <BarChart3 size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={() => verificarAcesso("/perfil")}
          >
            <User size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={() => verificarAcesso("/login")}
          >
            <LogIn size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={() => verificarAcesso("/cadastro")}
          >
            <UserPlus size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={() => verificarAcesso("/configuracoes")}
          >
            <Settings size={20} />
          </button>

          <button
            className={styles.iconButton}
            onClick={sair}
          >
            <LogOut size={20} />
          </button>

        </nav>

      </div>

      <div>

        <button
          className={styles.profileIcon}
          onClick={() => verificarAcesso("/perfil")}
        >
          <User size={20} />
        </button>

      </div>

    </aside>
  );
};

export default Header;