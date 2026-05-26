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

const HomeClient = () => {

  const navigate = useNavigate();

  const [projetosAtivos,
    setProjetosAtivos] =
    useState([]);

  useEffect(() => {

    const buscarEventos =
      async () => {

      try {

        const usuarioId =
          sessionStorage.getItem(
            "usuarioId"
          );

        const response =
          await axios.get(
            `http://localhost:8080/eventos/usuario/${usuarioId}`
          );

        setProjetosAtivos(
          response.data
        );

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
              Olá Cliente
            </h1>

            <p className={styles.greetingSub}>
              Você possui {
                projetosAtivos.length
              } eventos
            </p>

          </div>

          <button
            className={
              styles.btnNovoEvento
            }
            onClick={() =>
              navigate('/eventos')
            }
          >

            Novo Evento

          </button>

        </div>

        <div className={
          styles.projetosLista
        }>

          {projetosAtivos.length ===
          0 ? (

            <p>
              Nenhum evento criado.
            </p>

          ) : (

            projetosAtivos.map(
              (evento) => (

              <div
                key={evento.id}
                className={styles.card}
              >

                <h2
                  className={
                    styles.cardTitulo
                  }
                >
                  {evento.nomeEvento}
                </h2>

                <p>
                  {evento.tipoEvento}
                </p>

                <p>
                  {evento.data}
                </p>

                <p>
                  {evento.inicio}
                  {" "}às{" "}
                  {evento.termino}
                </p>

                <p>
                  {evento.servicosSelecionados}
                </p>

                <p>
                  Status:
                  {" "}
                  {evento.status}
                </p>

              </div>
            ))
          )}

        </div>

      </main>
    </div>
  );
};

export default HomeClient;