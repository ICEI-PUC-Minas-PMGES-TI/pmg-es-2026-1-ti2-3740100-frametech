import React, { useState, useEffect } from 'react';

export default function PaginaEventosAdm() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/eventos')
            .then(res => res.json())
            .then(data => setEventos(data))
            .catch(err => console.error("Erro no Admin:", err));
    }, []);

    const atualizarStatus = (id, novoStatus) => {
        fetch(`http://localhost:8080/api/eventos/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        }).then(() => window.location.reload());
    };

    return (
        <div className="admin-container">
            <h1>Painel Administrativo</h1>
            {eventos.map(evento => (
                <div key={evento.id} className="admin-card">
                    <h2 style={{ color: 'orange' }}>{evento.nomeEvento}</h2>
                    <p><strong>Tipo:</strong> {evento.tipoEvento}</p>
                    <p><strong>Porte:</strong> {evento.porteEvento}</p>
                    <p><strong>Data:</strong> {evento.dataEvento}</p>
                    <p><strong>Status:</strong> {evento.status}</p>
                    <button onClick={() => atualizarStatus(evento.id, 'ORCADO')}>
                        Marcar como Orçado
                    </button>
                </div>
            ))}
        </div>
    );
}