import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';

const TIPOS = [
  { key: 'empresa', icon: '🏢', label: 'Empresa', sub: 'Adm' },
  { key: 'prestador', icon: '📷', label: 'Prestador', sub: 'Evento' },
  { key: 'cliente', icon: '👤', label: 'Cliente', sub: 'Usuário' },
];

function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        'http://localhost:8080/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            senha,
            tipo
          }),
        }
      );

      if (!res.ok) {

        const erro = await res.text();
        throw new Error(erro);
      }

      const data = await res.json();

      sessionStorage.setItem(
        "usuarioId",
        data.id
      );

      const tipoDefinido =
        data.tipo === "empresa"
          ? "adm"
          : data.tipo;

      sessionStorage.setItem(
        "tipoUsuario",
        tipoDefinido
      );

      if (tipoDefinido === "cliente") {

        navigate("/home-cliente");

      } else if (tipoDefinido === "adm") {

        navigate("/home-adm");

      } else if (tipoDefinido === "prestador") {

        navigate("/home-profissional");
      }

    } catch (err) {

      console.log(err);

      alert("Erro no login");
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.logo}>
        <span className={styles.logoFrame}>FRAME</span>
        <span className={styles.logoTech}>TECH</span>
      </div>

      <div className={styles.centro}>
        <form className={styles.cartao} onSubmit={handleLogin}>

          <h1 className={styles.tituloCartao}>
            Bem vindo de volta
          </h1>

          <p className={styles.subCartao}>
            Ainda não tem cadastro?{" "}
            <Link to="/cadastro" className={styles.link}>
              Cadastre-se
            </Link>
          </p>

          <p className={styles.labelSecao}>
            Tipo de conta
          </p>

          <div className={styles.tiposConta}>

            {TIPOS.map(t => (

              <button
                key={t.key}
                type="button"
                className={`
                  ${styles.botaoTipo}
                  ${tipo === t.key
                    ? styles.botaoTipoAtivo
                    : ''
                  }
                `}
                onClick={() => setTipo(t.key)}
              >

                <span className={styles.iconeTipo}>
                  {t.icon}
                </span>

                <span className={styles.labelTipo}>
                  {t.label}
                </span>

                <span className={styles.subTipo}>
                  {t.sub}
                </span>

              </button>
            ))}

          </div>

          <p className={styles.labelSecao}>
            Credenciais
          </p>

          <div className={styles.campo}>

            <label className={styles.labelCampo}>
              Email
            </label>

            <input
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

          </div>

          <div className={styles.campo}>

            <label className={styles.labelCampo}>
              Senha
            </label>

            <input
              type="password"
              className={styles.input}
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

          </div>

          <div className={styles.esqueci}>
            <a className={styles.link}>
              Esqueci a senha
            </a>
          </div>

          <button
            type="submit"
            className={styles.botaoPrincipal}
          >
            Entrar
          </button>

          <button
            type="button"
            className={styles.botaoGoogle}
          >
            Entrar com Google
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;