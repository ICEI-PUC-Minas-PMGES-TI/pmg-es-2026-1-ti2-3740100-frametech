import React from 'react';
import Header from "../Header/Header";
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.paginaHome}>
      <Header />
      
      <main className={styles.conteudoPrincipal}>
        {/* SEÇÃO SUPERIOR: CHAMADA E DASHBOARD */}
        <section className={styles.secaoTopo}>
          <div className={styles.containerTexto}>
            <h1 className={styles.tituloPrincipal}>
              Gestão que acompanha seu <span>ritmo</span>
            </h1>
            <p className={styles.subtituloDescricao}>
              Do primeiro contato com o cliente até a entrega final — tudo em uma plataforma. Agendamentos, equipes, equipamentos e financeiro integrados.
            </p>
            <p className={styles.containerBotoes}>
              <span className={styles.linkLaranja}>Faça login</span> ou <span className={styles.linkVerde}>cadastre-se</span>
            </p>
          </div>

          <div className={styles.mockupDashboard}>
            <div className={styles.mockupCabecalho}>
              <div className={styles.bolinhasJanela}>
                <span className={styles.vermelha}></span>
                <span className={styles.amarela}></span>
                <span className={styles.verde}></span>
              </div>
              <span className={styles.mockupTitulo}>FrameTech - Dashboard</span>
            </div>
            <div className={styles.mockupGrade}>
              <div className={`${styles.quadroInfo} ${styles.fundoLaranja}`}>
                <p>Projetos ativos</p>
                <h3>24</h3>
              </div>
              <div className={`${styles.quadroInfo} ${styles.fundoVerde}`}>
                <p>Clientes</p>
                <h3>148</h3>
              </div>
              <div className={`${styles.quadroInfo} ${styles.fundoRoxo}`}>
                <p>Receita mês</p>
                <h3>87k</h3>
              </div>
              <div className={`${styles.quadroInfo} ${styles.fundoAmarelo}`}>
                <p>Entregas</p>
                <h3>129</h3>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE ESTATÍSTICAS COM CORES */}
        <section className={styles.secaoEstatisticas}>
          <div className={styles.itemEstatistica}>
            <h2 className={styles.numLaranja}>200 +</h2>
            <p>Projetos entregues</p>
          </div>
          <div className={styles.itemEstatistica}>
            <h2 className={styles.numVerde}>98 %</h2>
            <p>Satisfação dos clientes</p>
          </div>
          <div className={styles.itemEstatistica}>
            <h2 className={styles.numRoxo}>70 %</h2>
            <p>Melhoria de comunicação</p>
          </div>
          <div className={styles.itemEstatistica}>
            <h2 className={styles.numCinza}>1</h2>
            <p>Anos no setor audiovisual</p>
          </div>
        </section>

        {/* SEÇÃO DE CARDS COLORIDOS DE SERVIÇOS */}
        <section className={styles.gradeServicos}>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>Gestão de clientes</div>
            <p>Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.</p>
          </div>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagVerde}`}>Gestão de clientes</div>
            <p>Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.</p>
          </div>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagAmarela}`}>Gestão de clientes</div>
            <p>Reserva, devolução e rastreio de todo o inventário técnico em tempo real.</p>
          </div>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagRoxa}`}>Escalas de equipe</div>
            <p>Cadastro, histórico de orçamentos e acompanhamento do status em um só lugar.</p>
          </div>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>Financeiro</div>
            <p>Orçamentos, pagamentos e receita por projeto com visão consolidada.</p>
          </div>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLima}`}>Gestão de clientes</div>
            <p>Dashboards em tempo real com status de cada etapa da produção.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;