import React, {
  useEffect,
  useState
} from 'react';

import { useNavigate }
from 'react-router-dom';

import axios from 'axios';

import Header
from '../../Components/Header/Header';

import styles
from '../HomeClient/HomeClient.module.css';

const EVENT_FIELD_LABELS = {
  id: "ID do evento",
  nomeEvento: "Nome do evento",
  tipoEvento: "Tipo de evento",
  porteEvento: "Porte do evento",
  descricao: "Descrição",
  data: "Data",
  inicio: "Início",
  termino: "Término",
  nomeLocal: "Nome do local",
  endereco: "Endereço",
  numero: "Número",
  bairro: "Bairro",
  valorOrcamento: "Orçamento",
  tipoAmbiente: "Tipo de ambiente",
  servicosSelecionados: "Serviços selecionados",
  entregaSelecionada: "Entrega selecionada",
  prazoEntrega: "Prazo de entrega",
  qtdFotos: "Quantidade de fotos",
  referencias: "Referências",
  trabalhouAntes: "Trabalhou antes",
  anexoReferencias: "Anexo de referências",
  status: "Status",
};

const EVENT_FIELD_ORDER =
  Object.keys(EVENT_FIELD_LABELS);

const LONG_FIELDS = new Set([
  "descricao",
  "servicosSelecionados",
  "entregaSelecionada",
  "referencias",
  "anexoReferencias",
]);

const HIDDEN_FIELDS = new Set([
  "usuario",
]);

const HIDDEN_NESTED_FIELDS =
  new Set([
    "senha",
    "password",
    "fotoPerfil",
    "eventos",
  ]);

const EMPTY_VALUE =
  "Não informado";

const hasValue = (value) =>
  value !== null &&
  value !== undefined &&
  value !== "";

const formatLabel = (field) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) =>
      letter.toUpperCase()
    )
    .trim();

const formatDate = (value) => {
  if (!hasValue(value)) {
    return EMPTY_VALUE;
  }

  const parts =
    String(value).split("-");

  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return String(value);
};

const formatCurrency = (value) => {
  if (!hasValue(value)) {
    return EMPTY_VALUE;
  }

  const numberValue =
    Number(value);

  if (Number.isNaN(numberValue)) {
    return String(value);
  }

  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(numberValue);
};

const formatObjectValue = (value) => {
  const content = Object
    .entries(value)
    .filter(
      ([field, nestedValue]) =>
        !HIDDEN_NESTED_FIELDS.has(field) &&
        hasValue(nestedValue)
    )
    .map(
      ([field, nestedValue]) =>
        `${formatLabel(field)}: ${formatFieldValue(field, nestedValue)}`
    );

  return content.length > 0
    ? content.join(" | ")
    : EMPTY_VALUE;
};

function formatFieldValue(field, value) {
  if (!hasValue(value)) {
    return EMPTY_VALUE;
  }

  if (field === "data") {
    return formatDate(value);
  }

  if (field === "valorOrcamento") {
    return formatCurrency(value);
  }

  if (Array.isArray(value)) {
    return value.length > 0
      ? value.join(", ")
      : EMPTY_VALUE;
  }

  if (typeof value === "object") {
    return formatObjectValue(value);
  }

  return String(value);
}

const getEventDetails = (evento) => {
  const extraFields = Object
    .keys(evento || {})
    .filter(
      (field) =>
        !EVENT_FIELD_LABELS[field] &&
        !HIDDEN_FIELDS.has(field) &&
        typeof evento[field] !== "object"
    )
    .sort();

  return [
    ...EVENT_FIELD_ORDER,
    ...extraFields,
  ].map((field) => ({
    field,
    label:
      EVENT_FIELD_LABELS[field] ||
      formatLabel(field),
    value: formatFieldValue(
      field,
      evento?.[field]
    ),
    isLong: LONG_FIELDS.has(field),
  }));
};

const getStatusClass = (status) => {
  const normalizedStatus =
    String(status || "").toUpperCase();

  if (normalizedStatus === "ACEITO") {
    return styles.statusAceito;
  }

  if (normalizedStatus === "RECUSADO") {
    return styles.statusRecusado;
  }

  return styles.statusAnalise;
};

const HomeClient = () => {

  const navigate = useNavigate();

  const [projetosAtivos,
    setProjetosAtivos] =
    useState([]);

  const buscarEventos =
    async () => {

    try {

      const usuarioId =
        sessionStorage.getItem(
          "usuarioId"
        );

      const response =
        await axios.get(
          `https://pmg-es-2026-1-ti2-3740100-frametech-4.onrender.com/eventos/usuario/${usuarioId}`
        );

      setProjetosAtivos(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    buscarEventos();

  }, []);

  const aceitarOrcamento =
    async (id) => {

    try {

      await axios.put(
        `https://pmg-es-2026-1-ti2-3740100-frametech-4.onrender.com/eventos/${id}/status?status=ACEITO`
      );

      buscarEventos();

    } catch (error) {

      console.log(error);
    }
  };

  const recusarOrcamento =
    async (id) => {

    try {

      await axios.put(
        `https://pmg-es-2026-1-ti2-3740100-frametech-4.onrender.com/eventos/${id}/status?status=RECUSADO`
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

        <div className={styles.topRow}>

          <div>

            <h1 className={styles.greeting}>
              Olá Cliente
            </h1>

            <p className={styles.greetingSub}>
              Você possui {projetosAtivos.length} eventos
            </p>

          </div>

          <button
            className={styles.btnNovoEvento}
            onClick={() =>
              navigate('/eventos')
            }
          >
            Novo Evento
          </button>

        </div>

        <div className={styles.projetosLista}>

          {projetosAtivos.length === 0 ? (

            <p>Nenhum evento criado.</p>

          ) : (

            projetosAtivos.map(
              (evento) => {

                const eventDetails =
                  getEventDetails(evento);

                return (
                  <div
                    key={evento.id}
                    className={styles.card}
                  >

                    <div className={styles.cardHeader}>

                      <div>

                        <h2 className={styles.cardTitulo}>
                          {evento.nomeEvento || "Evento sem nome"}
                        </h2>

                        <p className={styles.cardSubtitulo}>
                          {evento.tipoEvento || "Tipo não informado"}
                        </p>

                      </div>

                      <span
                        className={getStatusClass(
                          evento.status
                        )}
                      >
                        {evento.status || "SEM_STATUS"}
                      </span>

                    </div>

                    <div className={styles.cardGrid}>

                      {eventDetails.map(
                        (detail) => (
                          <div
                            key={detail.field}
                            className={`${styles.fieldItem} ${
                              detail.isLong
                                ? styles.fieldItemLong
                                : ""
                            }`}
                          >

                            <span className={styles.fieldLabel}>
                              {detail.label}
                            </span>

                            {detail.field === "status" ? (
                              <span
                                className={getStatusClass(
                                  evento.status
                                )}
                              >
                                {detail.value}
                              </span>
                            ) : (
                              <p className={styles.fieldValue}>
                                {detail.value}
                              </p>
                            )}

                          </div>
                        )
                      )}

                    </div>

                    {hasValue(evento.valorOrcamento) && (

                      <p className={styles.valorOrcamento}>
                        {formatCurrency(
                          evento.valorOrcamento
                        )}
                      </p>

                    )}

                    {String(evento.status || "").toUpperCase() ===
                      "ORCAMENTO_ENVIADO" && (

                      <div className={styles.areaBotoes}>

                        <button
                          className={styles.btnAceitar}
                          onClick={() =>
                            aceitarOrcamento(
                              evento.id
                            )
                          }
                        >
                          Aceitar orçamento
                        </button>

                        <button
                          className={styles.btnRecusar}
                          onClick={() =>
                            recusarOrcamento(
                              evento.id
                            )
                          }
                        >
                          Recusar orçamento
                        </button>

                      </div>

                    )}

                  </div>
                );
              }
            )
          )}

        </div>

      </main>

    </div>
  );
};

export default HomeClient;
