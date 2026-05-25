import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const usuarioLogado = sessionStorage.getItem("usuarioId");
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");

  const verificarAcesso = (rota) => {
    if (rota === "/login" || rota === "/cadastro") return navigate(rota);

    if (!usuarioLogado) {
      alert("Você precisa fazer login primeiro.");
      return navigate("/login");
    }

    navigate(rota);
  };

  const verificarHome = () => {
    if (!usuarioLogado) return navigate("/");

    if (tipoUsuario === "adm") return navigate("/home-adm");
    if (tipoUsuario === "prestador") return navigate("/home-profissional");

    navigate("/home-cliente");
  };

  const sair = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>

      <div className={styles.logoContainer}>
        <div className={styles.logoFrame}>FRAME</div>
        <div className={styles.logoTech}>TECH</div>
      </div>

      <div className={styles.navGroup}>
        <button className={styles.iconButton} onClick={verificarHome}>🏠</button>
        <button className={styles.iconButton} onClick={() => verificarAcesso("/perfil")}>👤</button>
        <button className={styles.iconButton} onClick={() => verificarAcesso("/login")}>🔐</button>
        <button className={styles.iconButton} onClick={() => verificarAcesso("/cadastro")}>➕</button>
      </div>

      <button className={styles.profileIcon} onClick={sair}>🚪</button>

    </div>
  );
};

export default Header;