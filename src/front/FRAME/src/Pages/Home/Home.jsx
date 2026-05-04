import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import styles from './Home.module.css';

function Home() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/perfil")
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(err => console.error(err));
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div className={styles.paginaHome}>
      <Header />
      
      <main className={styles.conteudoPrincipal}>
        
        <section className={styles.secaoTopo}>
          <div className={styles.containerTexto}>
            <h1 className={styles.tituloPrincipal}>
              Gestão que acompanha seu <span>ritmo</span>
            </h1>
            <p className={styles.subtituloDescricao}>
              Do primeiro contato com o cliente até a entrega final — tudo em uma plataforma.
            </p>
            <p className={styles.containerBotoes}>
              <Link to="/login" className={styles.linkLaranja}>Faça login</Link> ou{" "}
              <Link to="/cadastro" className={styles.linkVerde}>cadastre-se</Link>
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
                <p>Nome</p>
                <h3>{dados.nome}</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoVerde}`}>
                <p>Email</p>
                <h3>{dados.email}</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoRoxo}`}>
                <p>Telefone</p>
                <h3>{dados.telefone}</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoAmarelo}`}>
                <p>Tipo</p>
                <h3>{dados.tipo}</h3>
              </div>
            </div>
          </div>
        </section>

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

        <section className={styles.gradeServicos}>
          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>Gestão de clientes</div>
            <p>Cadastro, histórico e acompanhamento.</p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagVerde}`}>Equipamentos</div>
            <p>Controle total do inventário.</p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagAmarela}`}>Projetos</div>
            <p>Gestão completa das produções.</p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagRoxa}`}>Equipe</div>
            <p>Escalas e organização.</p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>Financeiro</div>
            <p>Receita e pagamentos.</p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLima}`}>Dashboard</div>
            <p>Visão geral em tempo real.</p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;