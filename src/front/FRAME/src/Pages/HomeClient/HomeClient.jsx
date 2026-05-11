import React, { useEffect, useState } from "react";
import "./HomeClient.css";

export default function HomeClient() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const usuarioId =
      sessionStorage.getItem("usuarioId");

    console.log("ID DO USUÁRIO:", usuarioId);

    if (!usuarioId) {

      console.log("Usuário sem ID");

      return;
    }

    fetch(`http://localhost:8080/api/home/${usuarioId}`)

      .then(res => {

        if (!res.ok) {
          throw new Error("Erro ao buscar dados");
        }

        return res.json();
      })

      .then(response => {

        console.log("DADOS:", response);

        setData(response);
      })

      .catch(err => {

        console.log(err);
      });

  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">

      <div className="header">

        <div>

          <h2>
            Olá, <span>{data.nome}</span>
          </h2>

          <p>
            Você tem {data.projetosAtivos} projetos ativos
          </p>

        </div>

      </div>

      <div className="cards">

        <Card
          title="PROJETOS ATIVOS"
          value={data.projetosAtivos}
        />

        <Card
          title="PRÓXIMO EVENTO"
          value={
            data.proximoEvento?.data ||
            "Sem evento"
          }
        />

        <Card
          title="MENSAGENS"
          value={data.mensagens}
        />

      </div>

    </div>
  );
}

function Card({ title, value }) {

  return (
    <div className="card">

      <p className="card-title">
        {title}
      </p>

      <h2>{value}</h2>

    </div>
  );
}