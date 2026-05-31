import React from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  CalendarDays,
  Home,
  LogIn,
  LogOut,
  User,
  UserPlus,
  Package
} from 'lucide-react';
import styles from "./Header.module.css";
import {
  getCurrentUser,
  getHomeByRole
} from '../../utils/authRoutes';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isAuthenticated,
    tipoUsuario
  } = getCurrentUser();

  const verificarAcesso = (rota) => {
    if (rota === "/login" || rota === "/cadastro") {
      return navigate(rota);
    }

    if (!isAuthenticated) {
      alert("Voce precisa fazer login primeiro.");
      return navigate("/login");
    }

    navigate(rota);
  };

  const verificarHome = () => {
    if (!isAuthenticated) {
      return navigate("/");
    }

    navigate(getHomeByRole(tipoUsuario));
  };

  const sair = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (rota) =>
    location.pathname === rota;

  return (
    <div className={styles.sidebar}>

      <div className={styles.logoContainer}>
        <div className={styles.logoFrame}>FRAME</div>
        <div className={styles.logoTech}>TECH</div>
      </div>

      <div className={styles.navGroup}>
        <button
          className={`${styles.iconButton} ${
            location.pathname.includes("home")
              ? styles.active
              : ""
          }`}
          onClick={verificarHome}
          aria-label="Ir para home"
          title="Home"
        >
          <Home size={18} />
        </button>

        <button
          className={`${styles.iconButton} ${
            location.pathname === "/perfil"
              ? styles.active
              : ""
          }`}
          onClick={() => verificarAcesso("/perfil")}
          aria-label="Ir para perfil"
          title="Perfil"
        >
          <User size={18} />
        </button>


        {isAuthenticated && tipoUsuario === "adm" && (
          <>
            <button
              className={`${styles.iconButton} ${
                isActive("/escalas")
                  ? styles.active
                  : ""
              }`}
              onClick={() => verificarAcesso("/escalas")}
              aria-label="Ir para escalas"
              title="Escalas"
            >
              <CalendarDays size={18} />
            </button>

            <button
              className={`${styles.iconButton} ${
                isActive("/equipamentos")
                  ? styles.active
                  : ""
              }`}
              onClick={() => verificarAcesso("/equipamentos")}
              aria-label="Ir para equipamentos"
              title="Equipamentos"
            >
              <Package size={18} />
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <button
              className={styles.iconButton}
              onClick={() => verificarAcesso("/login")}
              aria-label="Ir para login"
              title="Login"
            >
              <LogIn size={18} />
            </button>

            <button
              className={styles.iconButton}
              onClick={() => verificarAcesso("/cadastro")}
              aria-label="Ir para cadastro"
              title="Cadastro"
            >
              <UserPlus size={18} />
            </button>
          </>
        )}
      </div>

      {isAuthenticated && (
        <button
          className={styles.profileIcon}
          onClick={sair}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut size={19} />
        </button>
      )}

    </div>
  );
};

export default Header;
