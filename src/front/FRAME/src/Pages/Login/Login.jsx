import React from 'react';
import styles from '../Login/Login.module.css'

function Login() {
  return (
    <>
     <div className={styles.pagina}>
      <header className={styles.cabecalho}>
        <span className={styles.logo}>
          <span className={styles.logoFrame}>FRAME</span>
          <span className={styles.logoTech}>TECH</span>
        </span>
        <span className={styles.textoConta}>
          Já tem conta? <a href="#" className={styles.linkEntrar}>Entrar agora</a>
        </span>
      </header>
 
      <main className={styles.container}>
        <h1 className={styles.titulo}>Crie sua conta gratuita</h1>
        <p className={styles.subtitulo}>Do primeiro contato à entrega final, tudo em uma plataforma.</p>
 
        <section className={styles.secao}>
          <span className={styles.rotuloSecao}>TIPO DE CONTA</span>
          <div className={styles.tiposConta}>
            <button className={`${styles.botaoTipo} ${styles.botaoTipoAtivo}`}>
              <span className={styles.iconeTipo}>🏢</span>
              <span className={styles.nomeTipo}>EMPRESA</span>
              <span className={styles.papelTipo}>Adm</span>
            </button>
            <button className={styles.botaoTipo}>
              <span className={styles.iconeTipo}>📷</span>
              <span className={styles.nomeTipo}>PRESTADOR</span>
              <span className={styles.papelTipo}>Evento</span>
            </button>
            <button className={styles.botaoTipo}>
              <span className={styles.iconeTipo}>👤</span>
              <span className={styles.nomeTipo}>CLIENTE</span>
              <span className={styles.papelTipo}>Usuário</span>
            </button>
          </div>
        </section>
 
        <section className={styles.secao}>
          <span className={styles.rotuloSecao}>DADOS PESSOAIS</span>
          <div className={styles.gradeFormulario}>
            <div className={styles.campo}>
              <label className={styles.rotulo}>Nome</label>
              <input className={styles.entrada} placeholder="Seu nome" />
            </div>
            <div className={styles.campo}>
              <label className={styles.rotulo}>Sobrenome</label>
              <input className={styles.entrada} placeholder="Sobrenome" />
            </div>
            <div className={`${styles.campo} ${styles.larguraTotal}`}>
              <label className={styles.rotulo}>Email</label>
              <input className={styles.entrada} placeholder="Email" type="email" />
            </div>
            <div className={styles.campo}>
              <label className={styles.rotulo}>Telefone</label>
              <input className={styles.entrada} placeholder="(31)99999-9999" />
            </div>
            <div className={styles.campo}>
              <label className={styles.rotulo}>Cidade</label>
              <input className={styles.entrada} placeholder="Belo Horizonte" />
            </div>
          </div>
        </section>
 
        <section className={styles.secao}>
          <span className={styles.rotuloSecao}>SEGURANÇA</span>
          <div className={styles.gradeFormulario}>
            <div className={`${styles.campo} ${styles.larguraTotal}`}>
              <label className={styles.rotulo}>Email</label>
              <input className={styles.entrada} placeholder="Mínimo 8 caracteres" type="email" />
              <span className={styles.dica}>8 caracteres · Letra maiúscula · Número</span>
            </div>
            <div className={`${styles.campo} ${styles.larguraTotal}`}>
              <label className={styles.rotulo}>Confirmar senha</label>
              <input className={styles.entrada} placeholder="Repita a senha" type="password" />
            </div>
          </div>
        </section>
 
        <div className={styles.termos}>
          <input type="checkbox" id="termos" className={styles.checkbox} />
          <label htmlFor="termos" className={styles.rotuloTermos}>
            Li e aceito os <a href="#" className={styles.linkTermos}>Termos de uso</a> e a Política de privacidade da <a href="#" className={styles.linkTermos}>FrameTech</a>.
          </label>
        </div>
 
        <div className={styles.acoes}>
          <button className={styles.botaoSecundario}>Cadastrar</button>
          <button className={styles.botaoPrimario}>Continuar para Empresa →</button>
        </div>
      </main>
    </div>
  );
    </>
  );
}

export default Login;