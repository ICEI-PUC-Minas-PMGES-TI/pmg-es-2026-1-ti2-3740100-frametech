import React from 'react';
import './PaginaEventos.css';

const PaginaEventos = () => {
  return (
    <div className="eventos-container">
      <header className="eventos-header">
        <h1 className="logo-text">
          FRAME<span>TECH</span>
        </h1>
      </header>

      <main className="eventos-form">

        {/* SOBRE O EVENTO */}
        <section className="form-section">
          <h3>SOBRE O EVENTO</h3>

          <div className="input-group">
            <label>Nome do evento</label>
            <input
              type="text"
              placeholder="Ex: Casamento João e Ana"
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Tipo de evento</label>
              <input
                type="text"
                placeholder="Ex: Formatura"
              />
            </div>

            <div className="input-group">
              <label>Porte do evento</label>
              <input
                type="text"
                placeholder="50 pessoas"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Descrição</label>
            <textarea rows="4"></textarea>
          </div>
        </section>

        {/* DATA E HORÁRIO */}
        <section className="form-section">
          <h3>DATA E HORÁRIO</h3>

          <div className="row">
            <div className="input-group">
              <label>Data</label>
              <input
                type="date"
                defaultValue="2026-07-25"
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

        {/* LOCAL */}
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

          <div className="row">
            <div className="input-group">
              <label>Número</label>
              <input
                type="text"
                placeholder="Ex: 500"
              />
            </div>

            <div className="input-group">
              <label>Bairro</label>
              <input
                type="text"
                placeholder="Ex: Coração Eucarístico"
              />
            </div>
          </div>

          <label className="sub-label">
            Tipo de ambiente
          </label>

          <div className="radio-grid">

            <label className="radio-option selected">
              <input
                type="radio"
                name="ambiente"
                defaultChecked
              />
              Interno (coberto)
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="ambiente"
              />
              Externo (ao ar livre)
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="ambiente"
              />
              Misto
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="ambiente"
              />
              Ainda não sei
            </label>

          </div>
        </section>

        {/* SERVIÇOS */}
        <section className="form-section grey-bg">
          <h3>SERVIÇOS</h3>

          {[
            {
              t: 'FILMAGEM',
              d: 'Cobertura completa do evento em vídeo'
            },
            {
              t: 'FOTOGRAFIA',
              d: 'Ensaio e cobertura fotográfica profissional'
            },
            {
              t: 'EDIÇÃO DE VÍDEO',
              d: 'Corte, trilha sonora, legendas e color grading',
              active: true
            },
            {
              t: 'TRANSMISSÃO AO VIVO',
              d: 'Streaming para YouTube, Instagram ou plataforma personalizada'
            },
            {
              t: 'DRONE',
              d: 'Imagens aéreas do evento e do local'
            }
          ].map((servico, i) => (
            <div
              key={i}
              className={`service-card ${servico.active ? 'active-border' : ''}`}
            >
              <input
                type="checkbox"
                checked={servico.active}
                readOnly
              />

              <div>
                <strong>{servico.t}</strong>
                <p>{servico.d}</p>
              </div>
            </div>
          ))}
        </section>

        {/* BOTÕES */}
        <div className="form-actions">
          <button className="btn-cancel">
            Cancelar
          </button>

          <button className="btn-submit">
            Enviar solicitação
          </button>
        </div>

      </main>
    </div>
  );
};

export default PaginaEventos;