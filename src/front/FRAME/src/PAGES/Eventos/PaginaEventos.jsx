import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaEventos.css';
import Header from '../../Components/Header/Header';

const PaginaEventos = () => {

  const navigate = useNavigate();

  const [nomeEvento, setNomeEvento] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [porteEvento, setPorteEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEvento, setDataEvento] = useState("");

  const salvarEvento = () => {

    const usuarioId =
      sessionStorage.getItem("usuarioId");

    fetch(`http://localhost:8080/api/eventos/${usuarioId}`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        nomeEvento,
        tipoEvento,
        porteEvento,
        descricao,
        dataEvento

      })

    })

    .then(res => res.json())

    .then(data => {

      console.log(data);

      alert("Evento criado!");

      navigate("/home-cliente");

    })

    .catch(err => {

      console.log(err);

    });
  };

  return (

    <div className="layout-eventos">

      <Header />

      <div className="eventos-container">

        <main className="eventos-form">

          <section className="form-section">

            <h3>SOBRE O EVENTO</h3>

            <div className="input-group">

              <label>Nome do evento</label>

              <input
                type="text"
                placeholder="Ex: Casamento João e Ana"
                value={nomeEvento}
                onChange={(e) =>
                  setNomeEvento(e.target.value)
                }
              />

            </div>

            <div className="row">

              <div className="input-group">

                <label>Tipo de evento</label>

                <input
                  type="text"
                  placeholder="Ex: Formatura"
                  value={tipoEvento}
                  onChange={(e) =>
                    setTipoEvento(e.target.value)
                  }
                />

              </div>

              <div className="input-group">

                <label>Porte do evento</label>

                <input
                  type="text"
                  placeholder="50 pessoas"
                  value={porteEvento}
                  onChange={(e) =>
                    setPorteEvento(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="input-group">

              <label>Descrição</label>

              <textarea
                rows="4"
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
              ></textarea>

            </div>

          </section>

          <section className="form-section">

            <h3>DATA E HORÁRIO</h3>

            <div className="row">

              <div className="input-group">

                <label>Data</label>

                <input
                  type="date"
                  value={dataEvento}
                  onChange={(e) =>
                    setDataEvento(e.target.value)
                  }
                />

              </div>

              <div className="input-group">

                <label>Início</label>

                <input type="time" />

              </div>

              <div className="input-group">

                <label>Término</label>

                <input type="time" />

              </div>

            </div>

          </section>

          <section className="form-section">

            <h3>LOCAL</h3>

            <div className="input-group">

              <label>Nome do espaço / local</label>

              <input
                type="text"
                placeholder="Ex: Espaço Garden"
              />

            </div>

            <div className="input-group">

              <label>Endereço</label>

              <input
                type="text"
                placeholder="Ex: Rua Dom José Gaspar"
              />

            </div>

          </section>

          <div className="form-actions">

            <button
              className="btn-cancel"
              onClick={() => navigate("/home-cliente")}
            >
              Cancelar
            </button>

            <button
              className="btn-submit"
              onClick={salvarEvento}
            >
              Enviar solicitação
            </button>

          </div>

        </main>

      </div>

    </div>
  );
};

export default PaginaEventos;