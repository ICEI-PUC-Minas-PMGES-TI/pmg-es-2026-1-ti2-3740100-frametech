import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/Header/Header';
import styles from '../HomeClient/HomeClient.module.css';

const StatusDot = ({ status }) => (
  <span className={`${styles.dot} ${styles[`dot_${status}`]}`} />
);

const EtapaTimeline = ({ etapas }) => (
  <div className={styles.timeline}>
    {(etapas || []).map((etapa, i) => (
      <div key={i} className={styles.etapaItem}>

        <div className={styles.etapaTrack}>

          {i > 0 && (
            <span
              className={`${styles.line} ${
                etapas[i - 1]?.status === 'done'
                  ? styles.lineDone
                  : styles.linePending
              }`}
            />
          )}

          <StatusDot status={etapa.status} />

        </div>

        <span className={styles.etapaLabel}>
          {etapa.label}
        </span>

      </div>
    ))}
  </div>
);

const ProjetoCard = ({ projeto }) => {

  const etapas = projeto.etapas || [];

  return (
    <div className={styles.card}>

      <div className={styles.cardHeader}>
        <span className={styles.cardBadge}>
          PROJETOS ATIVOS
        </span>
      </div>

      <h3 className={styles.cardTitulo}>
        {projeto.titulo}
      </h3>

      <p className={styles.cardSubtitulo}>
        {projeto.subtitulo}
      </p>

      <div className={styles.cardGrid}>

        <div>
          <span className={styles.fieldLabel}>
            Data do evento
          </span>

          <p className={styles.fieldValue}>
            {projeto.dataEvento}
          </p>
        </div>

        <div>
          <span className={styles.fieldLabel}>
            Horário
          </span>

          <p className={styles.fieldValue}>
            {projeto.horario}
          </p>
        </div>

        <div>
          <span className={styles.fieldLabel}>
            Serviços
          </span>

          <p className={styles.fieldValue}>
            {projeto.servicos}
          </p>
        </div>

        <div>
          <span className={styles.fieldLabel}>
            Entrega prevista
          </span>

          <p className={styles.fieldValue}>
            {projeto.entrega}
          </p>
        </div>

      </div>

      <EtapaTimeline etapas={etapas} />

    </div>
  );
};

const HomeClient = () => {

  const navigate = useNavigate();

  const [projetosAtivos, setProjetosAtivos] =
    useState([]);

  useEffect(() => {

    const buscarEventos = async () => {

      try {

        const usuarioId =
          sessionStorage.getItem("usuarioId");

        const response = await axios.get(
          `http://localhost:8080/eventos/usuario/${usuarioId}`
        );

        const eventos = response.data.map((evento) => ({

          id: evento.id,

          titulo: evento.nomeEvento,

          subtitulo: evento.tipoEvento,

          dataEvento: evento.data,

          horario:
            `${evento.inicio} às ${evento.termino}`,

          servicos:
            evento.servicosSelecionados,

          entrega:
            evento.prazoEntrega,

          etapas: [
            {
              label: 'Em análise',
              status:
                evento.status === 'EM_ANALISE'
                  ? 'done'
                  : 'pending'
            },
            {
              label: 'Produção',
              status: 'pending'
            },
            {
              label: 'Entrega',
              status: 'pending'
            }
          ]
        }));

        setProjetosAtivos(eventos);

      } catch (error) {

        console.log(error);
      }
    };

    buscarEventos();

  }, []);

  return (
    <div className={styles.layout}>

      <Header />

      <main className={styles.main}>

        <div className={styles.topRow}>

          <div>

            <h1 className={styles.greeting}>
              Olá,{" "}
              <span className={styles.greetingName}>
                Cliente
              </span>
            </h1>

            <p className={styles.greetingSub}>
              você tem {projetosAtivos.length} projetos ativos
            </p>

          </div>

          <button
            className={styles.btnNovoEvento}
            onClick={() => navigate('/eventos')}
          >
            Novo Evento
          </button>

        </div>

        <div className={styles.projetosLista}>

          {projetosAtivos.length === 0 ? (

            <p>Nenhum evento criado ainda.</p>

          ) : (

            projetosAtivos.map((p, i) => (
              <ProjetoCard
                key={p.id || i}
                projeto={p}
              />
            ))
          )}

        </div>

      </main>
    </div>
  );
};

export default HomeClient;