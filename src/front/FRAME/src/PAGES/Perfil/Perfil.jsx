import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./Perfil.css";

const API_URL = "http://localhost:8080/auth";

const criarForm = (usuario) => ({
  nome: usuario?.nome || "",
  email: usuario?.email || "",
  telefone: usuario?.telefone || "",
  senha: ""
});

const tipoLabel = {
  adm: "Empresa",
  empresa: "Empresa",
  prestador: "Prestador",
  cliente: "Cliente"
};

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState("");
  const [formData, setFormData] = useState(criarForm());

  const navigate = useNavigate();
  const usuarioId = sessionStorage.getItem("usuarioId");

  useEffect(() => {
    if (!usuarioId) {
      navigate("/login", { replace: true });
      return;
    }

    let ativo = true;

    const carregarPerfil = async () => {
      try {
        setLoading(true);
        setErro("");

        const response = await fetch(`${API_URL}/perfil/${usuarioId}`);

        if (!response.ok) {
          throw new Error("Nao foi possivel carregar o perfil.");
        }

        const data = await response.json();

        if (!ativo) return;

        setUser(data);
        setFormData(criarForm(data));
      } catch (err) {
        console.error(err);
        if (ativo) setErro("Nao foi possivel carregar os dados do perfil.");
      } finally {
        if (ativo) setLoading(false);
      }
    };

    carregarPerfil();

    return () => {
      ativo = false;
    };
  }, [navigate, usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.email.trim()) {
      setErro("Nome e email sao obrigatorios.");
      return;
    }

    try {
      setSaving(true);
      setErro("");

      const response = await fetch(`${API_URL}/perfil/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          senha: formData.senha
        })
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg);
      }

      const updated = await response.json();

      setUser(updated);
      setFormData(criarForm(updated));
      setIsEditing(false);

      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setErro("Erro ao atualizar perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(criarForm(user));
    setIsEditing(false);
    setErro("");
  };

  const handleDelete = async () => {
    const confirmar = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirmar) return;

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/perfil/${usuarioId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir conta.");
      }

      sessionStorage.clear();
      alert("Conta excluida com sucesso!");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      setErro("Erro ao excluir conta.");
    } finally {
      setSaving(false);
    }
  };

  const trocarFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_URL}/foto/${usuarioId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fotoPerfil: reader.result
          })
        });

        if (!res.ok) throw new Error("Erro ao atualizar foto");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao atualizar foto.");
      }
    };

    reader.readAsDataURL(file);
  };

  if (loading) return <div className="loading">Carregando...</div>;

  if (erro && !user)
    return (
      <div className="profile-container">
        <Header />
        <main className="content">
          <p className="error-message">{erro}</p>
        </main>
      </div>
    );

  return (
    <div className="profile-container">
      <Header />

      <main className="content">
        <header className="profile-header">
          <h1>
            Ola, <span className="highlight">{user.nome}</span>
          </h1>

          <label className="avatar-label">
            {user.fotoPerfil ? (
              <img src={user.fotoPerfil} alt="Perfil" className="avatar-img" />
            ) : (
              <div className="avatar-circle">{user.nome?.charAt(0)}</div>
            )}

            <input type="file" accept="image/*" hidden onChange={trocarFoto} />
          </label>
        </header>

        {erro && <p className="error-message">{erro}</p>}

        <section className="info-card">
          <div className="info-column">
            <p>
              <strong>Nome:</strong>{" "}
              {isEditing ? (
                <input name="nome" value={formData.nome} onChange={handleChange} />
              ) : (
                user.nome
              )}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {isEditing ? (
                <input name="email" value={formData.email} onChange={handleChange} />
              ) : (
                user.email
              )}
            </p>
          </div>

          <div className="info-column">
            <p>
              <strong>Telefone:</strong>{" "}
              {isEditing ? (
                <input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              ) : (
                user.telefone || "Nao informado"
              )}
            </p>

            <p>
              <strong>Senha:</strong>{" "}
              {isEditing ? (
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              ) : (
                "********"
              )}
            </p>

            <p>
              <strong>Tipo:</strong> {tipoLabel[user.tipo] || user.tipo}
            </p>
          </div>
        </section>

        <div className="button-group">
          {isEditing ? (
            <>
              <button onClick={handleSave} disabled={saving}>
                Salvar
              </button>

              <button onClick={handleCancel}>Cancelar</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>Editar</button>

              <button onClick={handleDelete} disabled={saving}>
                Excluir
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Perfil;