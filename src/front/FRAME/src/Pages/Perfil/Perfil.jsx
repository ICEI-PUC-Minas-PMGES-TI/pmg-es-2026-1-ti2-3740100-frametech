import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import "./Perfil.css";

const Perfil = () => {

  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  });

  const usuarioId = sessionStorage.getItem("usuarioId");

  useEffect(() => {

    if (!usuarioId) return;

    fetch(`http://localhost:8080/perfil/${usuarioId}`)
      .then(res => res.json())
      .then(data => {

        setUser(data);

        setFormData({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          senha: ""
        });

      })
      .catch(err => console.error("Erro ao buscar dados:", err));

  }, [usuarioId]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {

    try {

      const response = await fetch(`http://localhost:8080/perfil/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar");
      }

      const usuarioAtualizado = await response.json();

      setUser(usuarioAtualizado);

      setFormData({
        nome: usuarioAtualizado.nome || "",
        email: usuarioAtualizado.email || "",
        telefone: usuarioAtualizado.telefone || "",
        senha: ""
      });

      setIsEditing(false);

      alert("Perfil atualizado com sucesso!");

    } catch (err) {

      console.error(err);

      alert("Erro ao atualizar perfil");

    }
  };

  const handleDelete = async () => {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta?"
    );

    if (!confirmar) return;

    try {

      const response = await fetch(
        `http://localhost:8080/perfil/${usuarioId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir conta");
      }

      sessionStorage.clear();

      alert("Conta excluída com sucesso!");

      window.location.href = "/";

    } catch (err) {

      console.error(err);

      alert("Erro ao excluir conta");

    }
  };

  const trocarFoto = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {

      try {

        const base64 = reader.result;

        const res = await fetch(`http://localhost:8080/auth/foto/${usuarioId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fotoPerfil: base64
          })
        });

        const data = await res.json();

        setUser(data);

      } catch (err) {

        console.error(err);

      }
    };

    reader.readAsDataURL(file);
  };

  if (!user) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="profile-container">

      <Header />

      <main className="content">

        <header className="profile-header">

          <h1>
            Olá, <span className="highlight">{user.nome}</span>
          </h1>

          <label className="avatar-label">

            {user.fotoPerfil ? (
              <img
                src={user.fotoPerfil}
                alt="Perfil"
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

              {isEditing ? (
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                user.nome
              )}
            </p>

            <p>
              <strong>Email:</strong>

              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                user.email
              )}
            </p>

          </div>

          <div className="info-column">

            <p>
              <strong>Telefone:</strong>

              {isEditing ? (
                <input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                user.telefone
              )}
            </p>

            <p>
              <strong>Nova senha:</strong>

              {isEditing ? (
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                "********"
              )}
            </p>

            <p>
              <strong>Tipo:</strong> {user.tipo}
            </p>

          </div>

        </section>

        <div className="button-group">

          {isEditing ? (
            <>
              <button
                className="btn btn-save"
                onClick={handleSave}
              >
                Salvar Alterações
              </button>

              <button
                className="btn"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>

              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Excluir Conta
              </button>
            </>
          )}

        </div>

      </main>

    </div>
  );
};

export default Perfil;