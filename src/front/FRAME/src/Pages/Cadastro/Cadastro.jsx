import React, { useState } from 'react';
import styles from '../Login/Login.module.css';

function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) throw new Error();

      const data = await response.json();

      localStorage.setItem("usuario", JSON.stringify(data));

      alert("Login realizado ✅");
      window.location.href = "/";

    } catch {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.pagina}>
      <main className={styles.container}>

        <h1 className={styles.titulo}>Login</h1>

        <input
          className={styles.entrada}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.entrada}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className={styles.botaoPrimario} onClick={handleLogin}>
          Entrar
        </button>

      </main>
    </div>
  );
}

export default Login;