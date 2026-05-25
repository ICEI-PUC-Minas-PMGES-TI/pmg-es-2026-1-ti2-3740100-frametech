import React, { useState, useEffect } from 'react';

export default function PaginaEventosAdm() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/eventos')
            .then(res => res.json())
            .then(setEventos);
    }, []);

    const enviarOrcamento = (id) => {
        const valor = prompt("Digite o valor do orçamento:");
        fetch(`http://localhost:8080/api/eventos/${id}/orcamento`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ orcamento: valor })
        }).then(() => window.location.reload());
    };

    return (
        <div>
            <h1>Painel Adm</h1>
            {eventos.map(e => (
                <div key={e.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                    <h2>{e.nomeEvento} - Status: {e.status}</h2>
                    <button onClick={() => enviarOrcamento(e.id)}>Mandar Orçamento</button>
                    {/* Botão de escalar chamaria a rota POST /api/escala/{e.id} */}
                </div>
            ))}
        </div>
    );
}