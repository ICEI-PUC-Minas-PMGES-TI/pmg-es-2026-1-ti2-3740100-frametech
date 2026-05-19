import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeClient.css";
import Header from "../../Components/Header/Header";

export default function HomeClient() {

  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    const usuarioId =
      sessionStorage.getItem("usuarioId");

    fetch(`http://localhost:8080/api/eventos/${usuarioId}`)

      .then(res => res.json())

      .then(data => {

        setEventos(data);

      })

      .catch(err => {

        console.log(err);

      });

  }, []);

  return (

    <div className="home-layout">

      <Header />

      <div className="container">

        <div className="topo-home">

          <div>

            <h1>
              Meus Eventos
            </h1>

            <p className="subtitulo">
              Gerencie todos os seus eventos
            </p>

          </div>

          <button
            className="novo-evento-btn"
            onClick={() => navigate("/eventos")}
          >
            + Novo Evento
          </button>

        </div>

        {
          eventos.length === 0 ? (

            <div className="sem-eventos">

              <h2>
                Nenhum evento encontrado
              </h2>

              <p>
                Crie seu primeiro evento para começar.
              </p>

            </div>

          ) : (

            <div className="eventos-lista">

              {
                eventos.map((evento) => (

                  <div
                    key={evento.id}
                    className="card-evento-horizontal"
                  >

                    <div className="evento-header">

                      <div>

                        <p className="evento-label">
                          EVENTO
                        </p>

                        <h2>
                          {evento.nomeEvento}
                        </h2>

                      </div>

                      <span className="status-evento">
                        Em análise
                      </span>

                    </div>

                    <div className="evento-grid">

                      <div className="info-box">

                        <span className="info-title">
                          Tipo
                        </span>

                        <p>
                          {evento.tipoEvento}
                        </p>

                      </div>

                      <div className="info-box">

                        <span className="info-title">
                          Porte
                        </span>

                        <p>
                          {evento.porteEvento}
                        </p>

                      </div>

                      <div className="info-box">

                        <span className="info-title">
                          Data
                        </span>

                        <p>
                          {evento.dataEvento}
                        </p>

                      </div>

                    </div>

                    <div className="descricao-box">

                      <span className="info-title">
                        Descrição
                      </span>

                      <p>
                        {evento.descricao}
                      </p>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
}