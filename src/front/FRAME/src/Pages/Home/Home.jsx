import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import styles from './Home.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

function Home() {

  const navigate = useNavigate();

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
              Organize clientes, equipes, equipamentos e financeiro em um único sistema.
              Menos planilhas, mais controle.
            </p>

            <div className={styles.containerBotoes}>

              <button
                className={styles.botaoPrimario}
                onClick={() => navigate("/cadastro")}
              >
                Começar agora
              </button>

              <button
                className={styles.botaoSecundario}
                onClick={() => navigate("/login")}
              >
                Já tenho conta
              </button>

            </div>

          </div>

          <div className={styles.mockupDashboard}>

            <div className={styles.mockupCabecalho}>

              <div className={styles.bolinhasJanela}>
                <span className={styles.vermelha}></span>
                <span className={styles.amarela}></span>
                <span className={styles.verde}></span>
              </div>

              <span className={styles.mockupTitulo}>
                FrameTech - Dashboard
              </span>

            </div>

            <div className={styles.mockupGrade}>

              <div className={`${styles.quadroInfo} ${styles.fundoLaranja}`}>
                <p>Projetos</p>
                <h3>24</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoVerde}`}>
                <p>Clientes</p>
                <h3>148</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoRoxo}`}>
                <p>Receita</p>
                <h3>R$ 87k</h3>
              </div>

              <div className={`${styles.quadroInfo} ${styles.fundoAmarelo}`}>
                <p>Entregas</p>
                <h3>129</h3>
              </div>

            </div>

          </div>

        </section>

        <section className={styles.secaoCarrossel}>

          <h2 className={styles.tituloCarrossel}>
            Veja o sistema em ação
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
          >

            <SwiperSlide>
              <div className={styles.cardImagem}>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  alt="Dashboard"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className={styles.cardImagem}>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="Financeiro"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className={styles.cardImagem}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                  alt="Equipe"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className={styles.cardImagem}>
                <img
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
                  alt="Projetos"
                />
              </div>
            </SwiperSlide>

          </Swiper>

        </section>

        <section className={styles.secaoEstatisticas}>

          <div>
            <h2 className={styles.numLaranja}>+200</h2>
            <p>Projetos entregues</p>
          </div>

          <div>
            <h2 className={styles.numVerde}>98%</h2>
            <p>Satisfação</p>
          </div>

          <div>
            <h2 className={styles.numRoxo}>70%</h2>
            <p>Mais produtividade</p>
          </div>

          <div>
            <h2 className={styles.numCinza}>1 ano</h2>
            <p>No mercado</p>
          </div>

        </section>

        <section className={styles.gradeServicos}>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>
              Clientes
            </div>

            <p>
              Histórico completo, orçamentos e status de cada projeto.
            </p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagVerde}`}>
              Equipamentos
            </div>

            <p>
              Controle total do seu inventário e disponibilidade.
            </p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagAmarela}`}>
              Agenda
            </div>

            <p>
              Organize eventos, prazos e entregas em um só lugar.
            </p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagRoxa}`}>
              Equipe
            </div>

            <p>
              Escalas, funções e gestão de profissionais simplificada.
            </p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLaranja}`}>
              Financeiro
            </div>

            <p>
              Receitas, custos e visão completa por projeto.
            </p>
          </div>

          <div className={styles.cardServico}>
            <div className={`${styles.etiquetaCard} ${styles.tagLima}`}>
              Dashboard
            </div>

            <p>
              Indicadores em tempo real para decisões mais rápidas.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;