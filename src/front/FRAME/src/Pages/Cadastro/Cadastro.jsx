import React, { useState } from 'react';

import styles from './Cadastro.module.css';

function Cadastro() {
  const [tipoSelecionado, setTipoSelecionado] = useState(null);

  const tiposConta = [
    { id: 'empresa', titulo: 'EMPRESA', subtitulo: 'Adm' },
    { id: 'prestador', titulo: 'PRESTADOR', subtitulo: 'Evento' },
    { id: 'cliente', titulo: 'CLIENTE', subtitulo: 'Usuário' },
  ];

  return (
    <div className={styles.pagina}>
      
      
      <main className={styles.conteudo}>
        <header className={styles.cabecalho}>
          <p className={styles.entrar}>Já tem conta? <span className={styles.laranja}>Entrar agora</span></p>
          <h1 className={styles.titulo}>Crie sua conta gratuita</h1>
          <p className={styles.subtitulo}>Do primeiro contato à entrega final, tudo em uma plataforma.</p>
        </header>

        <section className={styles.secao}>
          <h2 className={styles.legenda}>TIPO DE CONTA</h2>
          <div className={styles.gradeCards}>
            {tiposConta.map((tipo) => (
              <div 
                key={tipo.id} 
                className={`${styles.card} ${tipoSelecionado === tipo.id ? styles.selecionado : ''}`}
                onClick={() => setTipoSelecionado(tipo.id)}
              >
                <div className={styles.icone}>X</div>
                <h3 className={styles.cardTitulo}>{tipo.titulo}</h3>
                <p className={styles.cardSub}>{tipo.subtitulo}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.secao}>
          <h2 className={styles.legenda}>DADOS PESSOAIS</h2>
          <div className={styles.gradeInput}>
            <div className={styles.campo}>
              <label>Nome</label>
              <input type="text" placeholder="Seu nome" />
            </div>
            <div className={styles.campo}>
              <label>Sobrenome</label>
              <input type="text" placeholder="Sobrenome" />
            </div>
            <div className={`${styles.campo} ${styles.duplo}`}>
              <label>Email</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className={styles.campo}>
              <label>Telefone</label>
              <input type="text" placeholder="(31) 99999-9999" />
            </div>
            <div className={styles.campo}>
              <label>Cidade</label>
              <input type="text" placeholder="Belo Horizonte" />
            </div>
          </div>
        </section>

        <section className={styles.secao}>
          <h2 className={styles.legenda}>SEGURANÇA</h2>
          <div className={styles.gradeInput}>
             <div className={`${styles.campo} ${styles.duplo}`}>
              <label>Email</label>
              <input type="email" placeholder="Minimo 8 caracteres" />
              <span className={styles.ajuda}>8 caracteres - Letra maiúscula - Número</span>
            </div>
            <div className={`${styles.campo} ${styles.duplo}`}>
              <label>Confirmar senha</label>
              <input type="password" placeholder="Repita a senha" />
            </div>
          </div>
        </section>

        <section className={styles.rodape}>
          <div className={styles.termos}>
            <input type="checkbox" id="termos" />
            <label htmlFor="termos">
              Li e aceito os <span className={styles.laranja}>Termos de uso</span> e a Política de privacidade da <span className={styles.laranja}>FrameTech</span>.
            </label>
          </div>

          <div className={styles.acoes}>
            <button className={styles.botao}>Cadastrar</button>
            <button className={styles.botao}>Continuar para Empresa</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cadastro;