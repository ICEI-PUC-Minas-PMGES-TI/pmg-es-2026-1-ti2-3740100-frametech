import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import {
    validarTelefone,
    formatarTelefone,
    validarSenha,
    filtrarApenasNumeros,
} from '../../utils/validacoes';

const TIPOS = [
    { id: 'empresa', label: 'EMPRESA', sub: 'Adm', icone: '🏠' },
    { id: 'prestador', label: 'PRESTADOR', sub: 'Evento', icone: '📷' },
    { id: 'cliente', label: 'CLIENTE', sub: 'Usuário', icone: '👤' },
];

function Cadastro() {
    const [tipoConta, setTipoConta] = useState('empresa');
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        senha: '',
        confirmarSenha: '',
    });

    const [erros, setErros] = useState({});
    const [aceito, setAceito] = useState(false);

    const atualizar = (campo) => (e) =>
        setForm((f) => ({ ...f, [campo]: e.target.value }));

    const handleTelefoneChange = (e) => {
        const formatado = formatarTelefone(e.target.value);
        setForm((f) => ({ ...f, telefone: formatado }));
        const erro = validarTelefone(formatado);
        setErros((prev) => ({ ...prev, telefone: erro || '' }));
    };

    const handleSenhaChange = (e) => {
        const valor = e.target.value;
        setForm((f) => ({ ...f, senha: valor }));
        const erro = validarSenha(valor);
        setErros((prev) => ({ ...prev, senha: erro || '' }));
    };

    const validarFormulario = () => {
        const novosErros = {};

        const erroTel = validarTelefone(form.telefone);
        if (erroTel) novosErros.telefone = erroTel;

        const erroSenha = validarSenha(form.senha);
        if (erroSenha) novosErros.senha = erroSenha;

        if (form.senha !== form.confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleCadastrar = async (e) => {
        e.preventDefault();

        if (!aceito) {
            alert('Aceite os termos para continuar.');
            return;
        }

        if (!validarFormulario()) {
            return;
        }

        try {
            const resposta = await fetch('http://localhost:8080/auth/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: form.nome,
                    email: form.email,
                    telefone: filtrarApenasNumeros(form.telefone),
                    senha: form.senha,
                    tipo: tipoConta,
                }),
            });

            if (!resposta.ok) {
                const erro = await resposta.text();
                throw new Error(erro);
            }

            await resposta.json();

            alert('Cadastro realizado com sucesso ✅');
            window.location.href = '/login';
        } catch (err) {
            console.error(err);
            alert(err.message || 'Erro ao cadastrar');
        }
    };

    return (
        <div className={styles.pagina}>
            <div className={styles.cabecalho}>
                <span className={styles.logo}>
                    FRAME<span className={styles.logoDestaque}>TECH</span>
                </span>
                <span className={styles.loginLink}>
                    Já tem conta?{' '}
                    <a href="/login" className={styles.loginLinkDestaque}>
                        Entrar agora
                    </a>
                </span>
            </div>

            <main className={styles.conteudo}>
                <h1 className={styles.titulo}>Crie sua conta gratuita</h1>
                <p className={styles.subtitulo}>
                    Do primeiro contato à entrega final, tudo em uma plataforma.
                </p>

                <div className={styles.cartao}>
                    <span className={styles.rotuloSecao}>TIPO DE CONTA</span>
                    <div className={styles.opcoesTipo}>
                        {TIPOS.map((tipo) => (
                            <button
                                type="button"
                                key={tipo.id}
                                className={`${styles.opcaoTipo} ${tipoConta === tipo.id ? styles.opcaoTipoAtiva : ''}`}
                                onClick={() => setTipoConta(tipo.id)}
                            >
                                <span className={styles.opcaoIcone}>{tipo.icone}</span>
                                <span className={styles.opcaoLabel}>{tipo.label}</span>
                                <span className={styles.opcaoSub}>{tipo.sub}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleCadastrar}>
                    <div className={`${styles.cartao} ${styles.cartaoDestacado}`}>
                        <span className={styles.rotuloSecao}>DADOS PESSOAIS</span>

                        <div className={styles.grupoEntrada}>
                            <label className={styles.rotulo}>Nome</label>
                            <input
                                className={styles.entrada}
                                placeholder="Seu nome"
                                value={form.nome}
                                onChange={atualizar('nome')}
                            />
                        </div>

                        <div className={styles.grupoEntrada}>
                            <label className={styles.rotulo}>Email</label>
                            <input
                                className={styles.entrada}
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={atualizar('email')}
                            />
                        </div>

                        <div className={styles.grupoEntrada}>
                            <label className={styles.rotulo}>Telefone</label>
                            <input
                                className={`${styles.entrada} ${erros.telefone ? styles.entradaErro : ''}`}
                                placeholder="(31) 99999-9999"
                                value={form.telefone}
                                onChange={handleTelefoneChange}
                                inputMode="numeric"
                            />
                            {erros.telefone && <span className={styles.msgErro}>{erros.telefone}</span>}
                        </div>
                    </div>

                    <div className={styles.cartao}>
                        <span className={styles.rotuloSecao}>SEGURANÇA</span>

                        <div className={styles.grupoEntrada}>
                            <label className={styles.rotulo}>Senha</label>
                            <input
                                className={`${styles.entrada} ${erros.senha ? styles.entradaErro : ''}`}
                                type="password"
                                value={form.senha}
                                onChange={handleSenhaChange}
                            />
                            {erros.senha && <span className={styles.msgErro}>{erros.senha}</span>}
                        </div>

                        <div className={styles.grupoEntrada}>
                            <label className={styles.rotulo}>Confirmar senha</label>
                            <input
                                className={`${styles.entrada} ${erros.confirmarSenha ? styles.entradaErro : ''}`}
                                type="password"
                                value={form.confirmarSenha}
                                onChange={atualizar('confirmarSenha')}
                            />
                            {erros.confirmarSenha && (
                                <span className={styles.msgErro}>{erros.confirmarSenha}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.termos}>
                        <input
                            type="checkbox"
                            checked={aceito}
                            onChange={(e) => setAceito(e.target.checked)}
                        />
                        <label>Aceito os termos</label>
                    </div>

                    <div className={styles.acoes}>
                        <button type="submit" className={styles.botaoPrimario}>
                            Cadastrar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Cadastro;
