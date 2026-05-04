import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
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
      {/* Barra Lateral Representada na Imagem */}
      <aside className="sidebar">
        <div className="brand">FRAME<span>TECH</span></div>
        <div className="nav-dots">
          {[...Array(7)].map((_, i) => <div key={i} className="dot" />)}
        </div>
      </aside>

      <main className="content">
        <header className="profile-header">
          <h1>Olá, <span className="highlight">{user.nome}</span></h1>
          <div className="avatar-circle">
            {user.nome.charAt(0)}
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

export default Profile;