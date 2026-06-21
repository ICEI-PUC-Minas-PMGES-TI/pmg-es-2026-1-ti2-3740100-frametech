import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import LogoClara from '../../Components/Logo.png'; 
import LogoEscura from '../../Components/LogoEscura.png'; 
import {
    getHomeByRole,
    normalizeUserType
} from '../../utils/authRoutes';

const TIPOS = [
    { key: 'empresa', icon: '🏢', label: 'Empresa', sub: 'Adm' },
    { key: 'prestador', icon: '📷', label: 'Prestador', sub: 'Evento' },
    { key: 'cliente', icon: '👤', label: 'Cliente', sub: 'Usuário' },
];

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('cliente');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

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
                const msg = await res.text();
                throw new Error(msg);
            }

            const data = await res.json();

            const tipoBanco = normalizeUserType(data.tipo);
            const tipoEscolhido = normalizeUserType(tipo);

            // BLOQUEIA TIPO DIFERENTE
            if (tipoBanco !== tipoEscolhido) {
                throw new Error(
                    "Tipo de conta incorreto para este usuário."
                );
            }

            sessionStorage.setItem(
                "usuarioId",
                data.id
            );

            sessionStorage.setItem(
                "tipoUsuario",
                tipoBanco
            );

            navigate(
                getHomeByRole(tipoBanco),
                {
                    replace: true
                }
            );

        } catch (err) {
            setErro(
                err.message || 
                "Email ou senha inválidos."
            );
        }
    };

    return (
        <div className={styles.pagina}>
            <div className={styles.barraSuperior}>
                <div className={styles.esquerdaBarra}>
                    <Link to="/" className={styles.botaoVoltar}>
                        <span className={styles.setaVoltar}>←</span>
                    </Link>
                    {/* 🏢 Logo agora é um link clicável para a Home */}
                    <Link to="/" className={styles.logoContainer}>
                        <img src={LogoClara} alt="Logo FrameTech" className={`${styles.logoImage} ${styles.logoClara}`} />
                        <img src={LogoEscura} alt="Logo FrameTech" className={`${styles.logoImage} ${styles.logoEscura}`} />
                    </Link>
                </div>
            </div>

            <div className={styles.centro}>
                <form
                    className={styles.cartao}
                    onSubmit={handleLogin}
                >
                    <h1 className={styles.tituloCartao}>
                        Bem vindo de volta
                    </h1>

                    <p className={styles.subCartao}>
                        Ainda não tem cadastro?{" "}
                        <Link
                            to="/cadastro"
                            className={styles.link}
                        >
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
                                className={`${styles.botaoTipo} ${
                                    tipo === t.key
                                    ? styles.botaoTipoAtivo
                                    : ''
                                }`}
                                onClick={() =>
                                    setTipo(t.key)
                                }
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
                            onChange={e =>
                                setEmail(e.target.value)
                            }
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
                            onChange={e =>
                                setSenha(e.target.value)
                            }
                        />
                    </div>

                    {erro && (
                        <p className={styles.msgErro}>
                            {erro}
                        </p>
                    )}

                    <div className={styles.esqueci}>
                        <Link
                            to="/esqueci-senha"
                            className={styles.link}
                        >
                            Esqueci a senha
                        </Link>
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