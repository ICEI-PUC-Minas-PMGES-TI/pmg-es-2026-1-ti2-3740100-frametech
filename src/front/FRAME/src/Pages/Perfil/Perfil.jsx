import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import "./Perfil.css";

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/perfil')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Erro ao buscar dados:", err));
  }, []);

  if (!user) return <div className="loading">Carregando...</div>;

  return (
    <div className="profile-container">

      <Header />

      <main className="content">
        <header className="profile-header">
          <h1>
            Olá, <span className="highlight">{user.nome}</span>
          </h1>

          <div className="avatar-circle">
            {user.nome?.charAt(0)}
          </div>
        </header>

        <section className="info-card">
          <div className="info-column">
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Senha:</strong> ***************</p>
          </div>

          <div className="info-column">
            <p><strong>Telefone:</strong> {user.telefone}</p>
            <p><strong>Tipo:</strong> {user.tipo}</p>
          </div>
        </section>

        <div className="button-group">
          <button className="btn btn-outline">Editar Perfil</button>
          <button className="btn btn-danger">Excluir Conta</button>
        </div>
      </main>
    </div>
  );
};

export default Perfil;