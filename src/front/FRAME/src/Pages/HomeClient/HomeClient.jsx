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

      .then(async (res) => {

        if (!res.ok) {

          const erro = await res.text();

          console.log("ERRO:", erro);

          throw new Error("Erro ao buscar eventos");
        }

        return res.json();

      })

      .then(data => {

        if (Array.isArray(data)) {

          setEventos(data);

        } else {

          setEventos([]);
        }

      })

      .catch(err => {

        console.log(err);

        setEventos([]);
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

                    <div className="evento-topo">

                      <div>

                        <span className="evento-categoria">
                          PROJETO ATIVO
                        </span>

                        <h2>
                          {evento.nomeEvento}
                        </h2>

                        <p className="evento-subtitulo">
                          {evento.tipoEvento}
                        </p>

                      </div>

                      <span className="status-evento">
                        Em análise
                      </span>

                    </div>

                    <div className="evento-info">

                      <div className="info-item">

                        <span className="info-label">
                          Data do evento
                        </span>

                        <p>
                          {evento.dataEvento}
                        </p>

                      </div>

                      <div className="info-item">

                        <span className="info-label">
                          Porte
                        </span>

                        <p>
                          {evento.porteEvento}
                        </p>

                      </div>

                      <div className="info-item">

                        <span className="info-label">
                          Tipo
                        </span>

                        <p>
                          {evento.tipoEvento}
                        </p>

                      </div>

                      <div className="info-item">

                        <span className="info-label">
                          Status
                        </span>

                        <p>
                          Em análise
                        </p>

                      </div>

                      <div className="info-item descricao-evento">

                        <span className="info-label">
                          Descrição
                        </span>

                        <p>
                          {evento.descricao}
                        </p>

                      </div>

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