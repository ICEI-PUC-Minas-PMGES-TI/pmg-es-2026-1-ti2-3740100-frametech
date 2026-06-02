import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EsqueciSenha.module.css";
import { validarSenha } from "../../utils/validacoes";

const ETAPAS = { EMAIL: "EMAIL", TOKEN: "TOKEN", NOVA_SENHA: "NOVA_SENHA", CONCLUIDO: "CONCLUIDO" };

function EsqueciSenha() {
    const [etapa, setEtapa] = useState(ETAPAS.EMAIL);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleSolicitarToken = async (e) => {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const res = await fetch("http://localhost:8080/auth/recuperar-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            const data = await res.json();
            setMensagem(`Token gerado: ${data.token}`);
            setEtapa(ETAPAS.TOKEN);
        } catch (err) {
            setErro(err.message || "Erro ao solicitar recuperação.");
        } finally {
            setCarregando(false);
        }
    };

    const handleValidarToken = async (e) => {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const res = await fetch(
                `http://localhost:8080/auth/validar-token?token=${token}`
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            setEtapa(ETAPAS.NOVA_SENHA);
        } catch (err) {
            setErro(err.message || "Token inválido ou expirado.");
        } finally {
            setCarregando(false);
        }
    };

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();
        setErro("");

        const erroValidacao = validarSenha(novaSenha);
        if (erroValidacao) {
            setErroSenha(erroValidacao);
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setErroSenha("As senhas não coincidem.");
            return;
        }

        setErroSenha("");
        setCarregando(true);

        try {
            const res = await fetch("http://localhost:8080/auth/redefinir-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, novaSenha }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            setEtapa(ETAPAS.CONCLUIDO);
        } catch (err) {
            setErro(err.message || "Erro ao redefinir senha.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.pagina}>
            <div className={styles.logo}>
                <span className={styles.logoFrame}>FRAME</span>
                <span className={styles.logoTech}>TECH</span>
            </div>

            <div className={styles.centro}>
                <div className={styles.cartao}>

                    {etapa === ETAPAS.EMAIL && (
                        <>
                            <h1 className={styles.tituloCartao}>Recuperar senha</h1>
                            <p className={styles.subCartao}>
                                Informe seu e-mail cadastrado para receber o token de recuperação.
                            </p>
                            <form onSubmit={handleSolicitarToken}>
                                <div className={styles.campo}>
                                    <label className={styles.labelCampo}>E-mail</label>
                                    <input
                                        className={styles.input}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {erro && <p className={styles.erro}>{erro}</p>}
                                <button
                                    type="submit"
                                    className={styles.botaoPrincipal}
                                    disabled={carregando}
                                >
                                    {carregando ? "Aguarde..." : "Enviar token"}
                                </button>
                            </form>
                        </>
                    )}

                    {etapa === ETAPAS.TOKEN && (
                        <>
                            <h1 className={styles.tituloCartao}>Informe o token</h1>
                            {mensagem && <p className={styles.info}>{mensagem}</p>}
                            <form onSubmit={handleValidarToken}>
                                <div className={styles.campo}>
                                    <label className={styles.labelCampo}>Token de recuperação</label>
                                    <input
                                        className={styles.input}
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        required
                                    />
                                </div>
                                {erro && <p className={styles.erro}>{erro}</p>}
                                <button
                                    type="submit"
                                    className={styles.botaoPrincipal}
                                    disabled={carregando}
                                >
                                    {carregando ? "Validando..." : "Validar token"}
                                </button>
                            </form>
                        </>
                    )}

                    {etapa === ETAPAS.NOVA_SENHA && (
                        <>
                            <h1 className={styles.tituloCartao}>Nova senha</h1>
                            <form onSubmit={handleRedefinirSenha}>
                                <div className={styles.campo}>
                                    <label className={styles.labelCampo}>Nova senha</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        value={novaSenha}
                                        onChange={(e) => {
                                            setNovaSenha(e.target.value);
                                            setErroSenha(validarSenha(e.target.value) || "");
                                        }}
                                        required
                                    />
                                </div>
                                <div className={styles.campo}>
                                    <label className={styles.labelCampo}>Confirmar nova senha</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required
                                    />
                                </div>
                                {erroSenha && <p className={styles.erro}>{erroSenha}</p>}
                                {erro && <p className={styles.erro}>{erro}</p>}
                                <button
                                    type="submit"
                                    className={styles.botaoPrincipal}
                                    disabled={carregando}
                                >
                                    {carregando ? "Salvando..." : "Redefinir senha"}
                                </button>
                            </form>
                        </>
                    )}

                    {etapa === ETAPAS.CONCLUIDO && (
                        <>
                            <h1 className={styles.tituloCartao}>Senha redefinida!</h1>
                            <p className={styles.subCartao}>
                                Sua senha foi atualizada com sucesso.
                            </p>
                            <Link to="/login" className={styles.botaoPrincipal}>
                                Ir para o login
                            </Link>
                        </>
                    )}

                    <div className={styles.voltarLogin}>
                        <Link to="/login" className={styles.link}>
                            Voltar para o login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EsqueciSenha;
