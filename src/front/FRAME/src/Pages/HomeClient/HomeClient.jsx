import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';

export default function HomeClient() {
  const [eventos, setEventos] = useState([]);
  const usuarioId = sessionStorage.getItem("usuarioId");

  useEffect(() => {
    if (!usuarioId) return;

    fetch(`http://localhost:8080/api/eventos/usuario/${usuarioId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEventos(data);
        } else {
          setEventos([]);
        }
      })
      .catch(err => {
        console.error("Erro ao carregar eventos:", err);
        setEventos([]);
      });
  }, [usuarioId]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Meus Eventos</h1>
        {eventos.length === 0 ? (
          <div style={{ background: '#fff', padding: '30px', borderRadius: '10px' }}>
            Nenhum evento encontrado.
          </div>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} style={{ background: '#fff', padding: '25px', borderRadius: '10px', marginBottom: '20px' }}>
              <h2>{evento.nomeEvento}</h2>
              <p><strong>Tipo:</strong> {evento.tipoEvento}</p>
              <p><strong>Porte:</strong> {evento.porteEvento}</p>
              <p><strong>Data:</strong> {evento.dataEvento}</p>
              <p><strong>Descrição:</strong> {evento.descricao}</p>
              <p><strong>Status:</strong> {evento.status}</p>
              <p><strong>Orçamento:</strong> {evento.orcamento ? `R$ ${evento.orcamento}` : "Aguardando orçamento"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}