import React, { useState, useEffect } from 'react';

export default function HomeClient() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Busca apenas os eventos deste cliente
        fetch('http://localhost:8080/api/eventos')
            .then(res => res.json())
            .then(data => setEventos(data.filter(e => e.status === 'ORCADO')));
    }, []);

    const aceitarOrcamento = (id) => {
        fetch(`http://localhost:8080/api/eventos/${id}/status`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ status: 'ACEITO' })
        }).then(() => {
            alert("Orçamento aceito! Aguarde a escala.");
            window.location.reload();
        });
    };

    return (
        <div>
            <h1>Meus Orçamentos</h1>
            {eventos.length === 0 ? <p>Nenhum orçamento pendente.</p> : null}
            {eventos.map(e => (
                <div key={e.id} style={{border: '1px solid #ccc', padding: '15px', margin: '10px'}}>
                    <h3>Evento: {e.nomeEvento}</h3>
                    <p>Valor Orçado: R$ {e.orcamento}</p>
                    <button onClick={() => aceitarOrcamento(e.id)}>Aceitar Orçamento</button>
                </div>
            ))}
        </div>
    );
}