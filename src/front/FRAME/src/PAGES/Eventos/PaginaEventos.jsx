import React, { useState, useEffect } from 'react';
import './PaginaEventos.css';

export default function PaginaEventos() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/eventos')
            .then(res => res.json())
            .then(data => setEventos(data))
            .catch(err => console.error("Erro:", err));
    }, []);

    return (
        <div className="container-eventos">
            <h1>Eventos Disponíveis</h1>
            {eventos.map(evento => (
                <div key={evento.id} className="card-evento">
                    <h2>{evento.nomeEvento}</h2>
                    <p>Status: {evento.status}</p>
                </div>
            ))}
        </div>
    );
}