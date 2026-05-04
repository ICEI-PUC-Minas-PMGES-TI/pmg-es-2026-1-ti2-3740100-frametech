import React, { useEffect, useState } from "react";
import "./HomeClient.css";

export default function HomeClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="loading">Carregando...</div>;

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2>Olá, <span>{data.nome}</span></h2>
          <p>Você tem {data.projetosAtivos} projetos ativos</p>
        </div>
        <button className="btn">Novo Evento</button>
      </div>

      <div className="cards">
        <Card title="PROJETOS ATIVOS" value={data.projetosAtivos} />
        <Card title="PRÓXIMO EVENTO" value={data.proximoEvento.data} />
        <Card title="MENSAGENS" value={data.mensagens} />
      </div>

      {data.projetos.map((p, i) => (
        <div key={i} className="project-card">
          <h3>{p.nome}</h3>

          <div className="grid">
            <div>
              <p className="label">Data do evento</p>
              <p>{p.data}</p>
            </div>

            <div>
              <p className="label">Horário</p>
              <p>{p.horario}</p>
            </div>

            <div>
              <p className="label">Serviços</p>
              <p>{p.servicos.join(" • ")}</p>
            </div>

            <div>
              <p className="label">Entrega prevista</p>
              <p>{p.entrega}</p>
            </div>
          </div>

          <div className="status-bar">
            <span className="active"></span>
            <span className="active"></span>
            <span className="active"></span>
            <span className="current"></span>
            <span></span>
            <span></span>
          </div>

          <div className="status-labels">
            <span>Solicitação</span>
            <span>Aprovado</span>
            <span>Agendado</span>
            <span>Em produção</span>
            <span>Edição</span>
            <span>Entrega</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h2>{value}</h2>
    </div>
  );
}