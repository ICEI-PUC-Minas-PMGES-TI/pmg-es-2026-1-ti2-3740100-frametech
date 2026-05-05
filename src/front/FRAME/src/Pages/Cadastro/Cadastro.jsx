import React, { useState } from 'react';
import styles from './Cadastro.module.css';

const TIPOS = [
  { id: 'empresa', label: 'EMPRESA', sub: 'Adm', icone: '⊞' },
  { id: 'prestador', label: 'PRESTADOR', sub: 'Evento', icone: '📷' },
  { id: 'cliente', label: 'CLIENTE', sub: 'Usuário', icone: '👤' },
];

function Cadastro() {
  const [tipoConta, setTipoConta] = useState('empresa');
  const [form, setForm] = useState({
    nome: '', sobrenome: '', email: '', telefone: '', cidade: '',
    senha: '', confirmarSenha: '',
  });
  const [aceito, setAceito] = useState(false);

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));

  const handleCadastrar = async () => {
    if (!aceito) { alert('Aceite os termos para continuar.'); return; }
    if (form.senha !== form.confirmarSenha) { alert('As senhas não coincidem.'); return; }
    try {
      const resposta = await fetch('http://localhost:8080/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tipoConta }),
      });
      if (!resposta.ok) throw new Error();
      alert('Cadastro realizado com sucesso ✅');
      window.location.href = '/login';
    } catch {
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <span className={styles.logo}>
          FRAME<span className={styles.logoDestaque}>TECH</span>
        </span>
        <span className={styles.loginLink}>
          Já tem conta? <a href="/login" className={styles.loginLinkDestaque}>Entrar agora</a>
        </span>
      </div>

      <main className={styles.conteudo}>
        <h1 className={styles.titulo}>Crie sua conta gratuita</h1>
        <p className={styles.subtitulo}>Do primeiro contato à entrega final, tudo em uma plataforma.</p>

        <div className={styles.cartao}>
          <span className={styles.rotuloSecao}>TIPO DE CONTA</span>
          <div className={styles.opcoesTipo}>
            {TIPOS.map((tipo) => (
              <button
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

        <div className={`${styles.cartao} ${styles.cartaoDestacado}`}>
          <span className={styles.rotuloSecao}>DADOS PESSOAIS</span>
          <div className={styles.linhaGrade}>
            <div className={styles.grupoEntrada}>
              <label className={styles.rotulo}>Nome</label>
              <input className={styles.entrada} placeholder="Seu nome" value={form.nome} onChange={atualizar('nome')} />
            </div>
            <div className={styles.grupoEntrada}>
              <label className={styles.rotulo}>Sobrenome</label>
              <input className={styles.entrada} placeholder="Sobrenome" value={form.sobrenome} onChange={atualizar('sobrenome')} />
            </div>
          </div>
          <div className={styles.grupoEntrada}>
            <label className={styles.rotulo}>Email</label>
            <input className={styles.entrada} type="email" placeholder="Email" value={form.email} onChange={atualizar('email')} />
          </div>
          <div className={styles.linhaGrade}>
            <div className={styles.grupoEntrada}>
              <label className={styles.rotulo}>Telefone</label>
              <input className={styles.entrada} placeholder="(31)99999-9999" value={form.telefone} onChange={atualizar('telefone')} />
            </div>
            <div className={styles.grupoEntrada}>
              <label className={styles.rotulo}>Cidade</label>
              <input className={styles.entrada} placeholder="Cidade" value={form.cidade} onChange={atualizar('cidade')} />
            </div>
          </div>
        </div>

        <div className={styles.cartao}>
          <span className={styles.rotuloSecao}>SEGURANÇA</span>
          <div className={styles.grupoEntrada}>
            <label className={styles.rotulo}>Senha</label>
            <input className={styles.entrada} type="password" placeholder="Mínimo 8 caracteres" value={form.senha} onChange={atualizar('senha')} />
            <span className={styles.dicaSenha}>8 caracteres · Letra maiúscula · Número</span>
          </div>
          <div className={styles.grupoEntrada}>
            <label className={styles.rotulo}>Confirmar senha</label>
            <input className={styles.entrada} type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={atualizar('confirmarSenha')} />
          </div>
        </div>

        <div className={styles.termos}>
          <input type="checkbox" id="aceite" checked={aceito} onChange={(e) => setAceito(e.target.checked)} />
          <label htmlFor="aceite">
            Li e aceito os <a href="/termos" className={styles.termoLink}>Termos de uso</a> e a Política de privacidade da <a href="/privacidade" className={styles.termoLink}>FrameTech</a>.
          </label>
        </div>

        <div className={styles.acoes}>
          <button className={styles.botaoSecundario} onClick={handleCadastrar}>Cadastrar</button>
          <button className={styles.botaoPrimario} onClick={() => window.location.href = `/${tipoConta}`}>
            Continuar para {TIPOS.find((t) => t.id === tipoConta)?.label} →
          </button>
        </div>
      </main>
    </div>
  );
}

export default Cadastro;