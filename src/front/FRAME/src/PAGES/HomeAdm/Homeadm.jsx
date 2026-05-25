import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import styles from './HomeAdm.module.css';

import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle
} from 'lucide-react';

const propostasIniciais = [
  {
    id: 1,
    titulo: 'Formatura Direito — Turma 2025',
    local: 'Formatura · PUC Minas, Belo Horizonte',
    horario: '19h00 — 23h00',
    dataEvento: '29/04/2026',
    servicos: ['Filmagem', 'Fotografia', 'Drone'],
    status: 'pendente',
  },

  {
    id: 2,
    titulo: 'Formatura Direito — Turma 2025',
    local: 'Formatura · PUC Minas, Belo Horizonte',
    horario: '19h00 — 23h00',
    dataEvento: '29/04/2026',
    preco: '120.340,00',
    dataEntrega: '29/04/2026',
    servicos: ['Filmagem', 'Fotografia', 'Drone'],
    status: 'aceita',
  },
];

const CartaoProposta = ({
  proposta,
  onAceitar,
  onRecusar
}) => {
  return (
    <div
      className={`${styles.card} ${
        proposta.status === 'aceita'
          ? styles.cardAceita
          : ''
      }`}
    >
      <div className={styles.cardHeader}>

        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitulo}>
            {proposta.titulo}
          </h3>

          <span className={styles.cardLocal}>
            {proposta.local}
          </span>
        </div>

        <div className={styles.cardMeta}>

          <div className={styles.metaItem}>
            <Clock size={13} className={styles.metaIcon} />

            <div>
              <span className={styles.metaLabel}>
                Horário
              </span>

              <span className={styles.metaValor}>
                {proposta.horario}
              </span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <Calendar size={13} className={styles.metaIcon} />

            <div>
              <span className={styles.metaLabel}>
                Data do evento
              </span>

              <span
                className={`${styles.metaValor} ${styles.destaque}`}
              >
                {proposta.dataEvento}
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.cardFooter}>

        <div className={styles.servicosArea}>
          <span className={styles.servicosLabel}>
            Serviços
          </span>

          <div className={styles.servicosTags}>
            {proposta.servicos.map((s, i) => (
              <React.Fragment key={s}>

                <span className={styles.servicoTag}>
                  {s}
                </span>

                {i < proposta.servicos.length - 1 && (
                  <span className={styles.servicoSeparador}>
                    ·
                  </span>
                )}

              </React.Fragment>
            ))}
          </div>
        </div>

        {proposta.status === 'pendente' ? (

          <div className={styles.acoes}>

            <button
              className={`${styles.btn} ${styles.btnAceitar}`}
              onClick={() => onAceitar(proposta.id)}
            >
              <CheckCircle size={15} />
              Aceitar
            </button>

            <button
              className={`${styles.btn} ${styles.btnRecusar}`}
              onClick={() => onRecusar(proposta.id)}
            >
              <XCircle size={15} />
              Recusar
            </button>

          </div>

        ) : (

          <div className={styles.precosArea}>

            {proposta.preco && (
              <div className={styles.metaItem}>

                <DollarSign
                  size={13}
                  className={styles.metaIcon}
                />

                <div>
                  <span className={styles.metaLabel}>
                    Preço
                  </span>

                  <span
                    className={`${styles.metaValor} ${styles.destaque}`}
                  >
                    {proposta.preco}
                  </span>
                </div>

              </div>
            )}

            {proposta.dataEntrega && (
              <div className={styles.metaItem}>

                <Calendar
                  size={13}
                  className={styles.metaIcon}
                />

                <div>
                  <span className={styles.metaLabel}>
                    Data de Entrega
                  </span>

                  <span
                    className={`${styles.metaValor} ${styles.destaque}`}
                  >
                    {proposta.dataEntrega}
                  </span>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

const HomeAdm = () => {

  const navigate = useNavigate();

  const [propostas, setPropostas] =
    useState(propostasIniciais);

  const handleAceitar = (id) => {

    setPropostas((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'aceita',
              preco: '120.340,00',
              dataEntrega: '29/04/2026',
            }
          : p
      )
    );
  };

  const handleRecusar = (id) => {

    setPropostas((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <div className={styles.layout}>

      <Header />

      <main className={styles.main}>

        <div className={styles.topBar}>

          <h1 className={styles.pageTitle}>
            Propostas
          </h1>

          <button
            className={styles.btnEscalas}
            onClick={() => navigate('/escalas')}
          >
            Escalas
          </button>

        </div>

        <div className={styles.lista}>

          {propostas.map((proposta) => (
            <CartaoProposta
              key={proposta.id}
              proposta={proposta}
              onAceitar={handleAceitar}
              onRecusar={handleRecusar}
            />
          ))}

        </div>

      </main>
    </div>
  );
};

export default HomeAdm;