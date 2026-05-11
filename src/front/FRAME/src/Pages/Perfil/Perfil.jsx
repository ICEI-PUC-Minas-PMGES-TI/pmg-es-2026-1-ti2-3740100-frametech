import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import "./Perfil.css";

const Perfil = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const usuarioId =
      sessionStorage.getItem("usuarioId");

    if (!usuarioId) {

      alert("Usuário não logado");

      return;
    }

    fetch(
      `http://localhost:8080/auth/perfil/${usuarioId}`
    )
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));

  }, []);

  const trocarFoto = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      const base64 = reader.result;

      const usuarioId =
        sessionStorage.getItem("usuarioId");

      const res = await fetch(
        `http://localhost:8080/auth/foto/${usuarioId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            fotoPerfil: base64
          })
        }
      );

      const data = await res.json();

      setUser(data);
    };

    reader.readAsDataURL(file);
  };

  if (!user) {

    return <div>Carregando...</div>;
  }

  return (

    <div className="profile-container">

      <Header />

      <main className="content">

        <header className="profile-header">

          <h1>
            Olá,
            <span className="highlight">
              {user.nome}
            </span>
          </h1>

          <label className="avatar-label">

            {user.fotoPerfil ? (

              <img
                src={user.fotoPerfil}
                alt="Foto Perfil"
                className="avatar-img"
              />

            ) : (

              <div className="avatar-circle">
                {user.nome?.charAt(0)}
              </div>

            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={trocarFoto}
            />

          </label>

        </header>

        <section className="info-card">

          <div className="info-column">

            <p>
              <strong>Nome:</strong>
              {user.nome}
            </p>

            <p>
              <strong>Email:</strong>
              {user.email}
            </p>

            <p>
              <strong>Senha:</strong>
              ********
            </p>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Perfil;