import React, {
  useEffect,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Header from '../../Components/Header/Header';

import styles from './HomeAdm.module.css';

import {
  Calendar,
  Clock,
  DollarSign,
  XCircle
} from 'lucide-react';

const CartaoProposta = ({
  proposta,
  onAceitar,
  onRecusar
}) => {

  const statusFormatado = {
    EM_ANALISE: 'pendente',
    ORCAMENTO_ENVIADO: 'orçamento enviado',
    ACEITO: 'aceita',
    RECUSADO: 'recusada'
  };

  return (
    <div
      className={`${styles.card} ${
        proposta.status === 'ACEITO'
          ? styles.cardAceita
          : ''
      }`}
    >
      <div className={styles.cardHeader}>

        <div className={styles.cardInfo}>

          <h3 className={styles.cardTitulo}>
            {proposta.nomeEvento}
          </h3>

          <span className={styles.cardLocal}>
            {proposta.tipoEvento} · {proposta.nomeLocal}
          </span>

        </div>

        <div className={styles.cardMeta}>

          <div className={styles.metaItem}>

            <Clock
              size={13}
              className={styles.metaIcon}
            />

            <div>

              <span className={styles.metaLabel}>
                Horário
              </span>

              <span className={styles.metaValor}>
                {proposta.inicio} — {proposta.termino}
              </span>

            </div>

          </div>

          <div className={styles.metaItem}>

            <Calendar
              size={13}
              className={styles.metaIcon}
            />

            <div>

              <span className={styles.metaLabel}>
                Data do evento
              </span>

              <span
                className={`${styles.metaValor} ${styles.destaque}`}
              >
                {proposta.data}
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

            {proposta.servicosSelecionados
              ?.split(',')
              .map((s, i, array) => (

                <React.Fragment key={i}>

                  <span className={styles.servicoTag}>
                    {s}
                  </span>

                  {i < array.length - 1 && (
                    <span className={styles.servicoSeparador}>
                      ·
                    </span>
                  )}

                </React.Fragment>
              ))}

          </div>

        </div>

        {proposta.status === 'EM_ANALISE' ? (

          <div className={styles.acoes}>

            <button
              className={`${styles.btn} ${styles.btnAceitar}`}
              onClick={() => onAceitar(proposta.id)}
            >

              <DollarSign size={15} />

              Enviar orçamento

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

            <div className={styles.metaItem}>

              <DollarSign
                size={13}
                className={styles.metaIcon}
              />

              <div>

                <span className={styles.metaLabel}>
                  Status
                </span>

                <span
                  className={`${styles.metaValor} ${styles.destaque}`}
                >
                  {statusFormatado[proposta.status]}
                </span>

              </div>

            </div>

            {proposta.valorOrcamento && (

              <div className={styles.metaItem}>

                <DollarSign
                  size={13}
                  className={styles.metaIcon}
                />

                <div>

                  <span className={styles.metaLabel}>
                    Orçamento
                  </span>

                  <span
                    className={`${styles.metaValor} ${styles.destaque}`}
                  >
                    R$ {proposta.valorOrcamento}
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
    useState([]);

  const [modalAberto, setModalAberto] =
    useState(false);

  const [eventoSelecionado, setEventoSelecionado] =
    useState(null);

  const [valorOrcamento, setValorOrcamento] =
    useState('');

  const buscarEventos = async () => {

    try {

      const response =
        await axios.get(
          'http://localhost:8080/eventos'
        );

      setPropostas(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    buscarEventos();

  }, []);

  const handleAceitar = (id) => {

    setEventoSelecionado(id);

    setModalAberto(true);
  };

  const enviarOrcamento = async () => {

    try {

      await axios.put(
        `http://localhost:8080/eventos/${eventoSelecionado}/orcamento?valor=${valorOrcamento}`
      );

      setModalAberto(false);

      setEventoSelecionado(null);

      setValorOrcamento('');

      buscarEventos();

    } catch (error) {

      console.log(error);
    }
  };

  const handleRecusar = async (id) => {

    try {

      await axios.put(
        `http://localhost:8080/eventos/${id}/status?status=RECUSADO`
      );

      buscarEventos();

    } catch (error) {

      console.log(error);
    }
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

      {modalAberto && (

        <div className={styles.modalOverlay}>

          <div className={styles.modal}>

            <h2>
              Enviar orçamento
            </h2>

            <input
              type="number"
              placeholder="Digite o valor"
              value={valorOrcamento}
              onChange={(e) =>
                setValorOrcamento(
                  e.target.value
                )
              }
              className={styles.inputOrcamento}
            />

            <div className={styles.modalButtons}>

              <button
                className={styles.btnRecusar}
                onClick={() =>
                  setModalAberto(false)
                }
              >
                Cancelar
              </button>

              <button
                className={styles.btnAceitar}
                onClick={enviarOrcamento}
              >
                Enviar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default HomeAdm;