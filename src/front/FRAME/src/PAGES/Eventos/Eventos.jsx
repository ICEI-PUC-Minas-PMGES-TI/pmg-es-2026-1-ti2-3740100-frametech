import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import styles from './PaginaEventos.module.css';

const servicos = [
  {
    id: 'filmagem',
    label: 'FILMAGEM',
    descricao: 'Cobertura completa do evento em vídeo'
  },
  {
    id: 'fotografia',
    label: 'FOTOGRAFIA',
    descricao: 'Ensaio e cobertura fotográfica profissional'
  },
  {
    id: 'edicao',
    label: 'EDIÇÃO DE VÍDEO',
    descricao: 'Corte, trilha sonora, legendas e color grading'
  },
  {
    id: 'transmissao',
    label: 'TRANSMISSÃO AO VIVO',
    descricao: 'Streaming para YouTube, Instagram ou plataforma personalizada'
  },
  {
    id: 'drone',
    label: 'DRONE',
    descricao: 'Imagens aéreas do evento e do local'
  },
  {
    id: 'captacao',
    label: 'CAPTAÇÃO DE ÁUDIO',
    descricao: 'Microfones e equipamento de som profissional'
  },
  {
    id: 'making',
    label: 'MAKING OF/BASTIDORES',
    descricao: 'Cobertura dos preparativos antes do evento'
  },
];

const entregaMaterial = [
  { id: 'video_editado', label: 'Vídeo editado (MP4)' },
  { id: 'fotos_alta', label: 'Fotos em alta resolução' },
  { id: 'album_digital', label: 'Álbum digital' },
  { id: 'pendrive', label: 'Pendrive com material' },
  { id: 'link_download', label: 'Link para download' },
  { id: 'reels', label: 'Reels / Stories editados' },
];

const SolicitacaoServico = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    nomeEvento: '',
    tipoEvento: '',
    porteEvento: '',
    descricao: '',

    data: '',
    inicio: '',
    termino: '',

    nomeLocal: '',
    endereco: '',
    numero: '',
    bairro: '',

    tipoAmbiente: '',

    servicosSelecionados: [],
    entregaSelecionada: [],

    prazoEntrega: '',
    qtdFotos: '',

    referencias: '',
    trabalhouAntes: '',
    anexoReferencias: '',
  });

  const toggleServico = (id) => {

    setForm((prev) => ({

      ...prev,

      servicosSelecionados:
        prev.servicosSelecionados.includes(id)

          ? prev.servicosSelecionados.filter(
              (s) => s !== id
            )

          : [...prev.servicosSelecionados, id],
    }));
  };

  const toggleEntrega = (id) => {

    setForm((prev) => ({

      ...prev,

      entregaSelecionada:
        prev.entregaSelecionada.includes(id)

          ? prev.entregaSelecionada.filter(
              (e) => e !== id
            )

          : [...prev.entregaSelecionada, id],
    }));
  };

  const set = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));

  const handleEnviar = async (e) => {

    e.preventDefault();

    try {

      const usuarioId =
        sessionStorage.getItem("usuarioId");

      console.log("USUARIO ID:", usuarioId);

      const body = {

        nomeEvento: form.nomeEvento,
        tipoEvento: form.tipoEvento,
        porteEvento: form.porteEvento,
        descricao: form.descricao,

        data: form.data,
        inicio: form.inicio,
        termino: form.termino,

        nomeLocal: form.nomeLocal,
        endereco: form.endereco,
        numero: form.numero,
        bairro: form.bairro,

        tipoAmbiente: form.tipoAmbiente,

        servicosSelecionados:
          form.servicosSelecionados.join(", "),

        entregaSelecionada:
          form.entregaSelecionada.join(", "),

        prazoEntrega: form.prazoEntrega,
        qtdFotos: form.qtdFotos,

        referencias: form.referencias,
        trabalhouAntes: form.trabalhouAntes,
        anexoReferencias: form.anexoReferencias
      };

      console.log(body);

      const response = await fetch(
        `http://localhost:8080/eventos/${usuarioId}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {

        const erro = await response.text();

        console.log(erro);

        throw new Error(erro);
      }

      const data = await response.json();

      console.log(data);

      alert("Evento enviado com sucesso!");

      navigate("/home-cliente");

    } catch (error) {

      console.log(error);

      alert("Erro ao enviar evento");
    }
  };

  return (
    <div className={styles.layout}>

      <Header />

      <main className={styles.main}>

        <form
          className={styles.form}
          onSubmit={handleEnviar}
        >

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              SOBRE O EVENTO
            </h2>

            <div className={styles.campo}>

              <label className={styles.label}>
                Nome do evento
              </label>

              <input
                className={styles.input}
                placeholder="Ex: Casamento, Juca e Iara"
                value={form.nomeEvento}
                onChange={set('nomeEvento')}
              />

            </div>

            <div className={styles.row}>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Tipo de evento
                </label>

                <input
                  className={styles.input}
                  placeholder="Ex: Formatura"
                  value={form.tipoEvento}
                  onChange={set('tipoEvento')}
                />

              </div>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Porte do evento
                </label>

                <input
                  className={styles.input}
                  placeholder="50 pessoas"
                  value={form.porteEvento}
                  onChange={set('porteEvento')}
                />

              </div>

            </div>

            <div className={styles.campo}>

              <label className={styles.label}>
                Descrição
              </label>

              <textarea
                className={styles.textarea}
                rows={4}
                value={form.descricao}
                onChange={set('descricao')}
              />

            </div>

          </section>

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              DATA E HORÁRIO
            </h2>

            <div className={styles.row}>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Data
                </label>

                <input
                  className={styles.input}
                  type="date"
                  value={form.data}
                  onChange={set('data')}
                />

              </div>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Início
                </label>

                <input
                  className={styles.input}
                  type="time"
                  value={form.inicio}
                  onChange={set('inicio')}
                />

              </div>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Término
                </label>

                <input
                  className={styles.input}
                  type="time"
                  value={form.termino}
                  onChange={set('termino')}
                />

              </div>

            </div>

          </section>

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              LOCAL
            </h2>

            <div className={styles.campo}>

              <label className={styles.label}>
                Nome do espaço / local
              </label>

              <input
                className={styles.input}
                value={form.nomeLocal}
                onChange={set('nomeLocal')}
              />

            </div>

            <div className={styles.campo}>

              <label className={styles.label}>
                Endereço
              </label>

              <input
                className={styles.input}
                value={form.endereco}
                onChange={set('endereco')}
              />

            </div>

            <div className={styles.row}>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Número
                </label>

                <input
                  className={styles.input}
                  value={form.numero}
                  onChange={set('numero')}
                />

              </div>

              <div className={styles.campo}>

                <label className={styles.label}>
                  Bairro
                </label>

                <input
                  className={styles.input}
                  value={form.bairro}
                  onChange={set('bairro')}
                />

              </div>

            </div>

          </section>

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              SERVIÇOS
            </h2>

            <div className={styles.servicosList}>

              {servicos.map((s) => (

                <label
                  key={s.id}
                  className={`${styles.servicoItem} ${form.servicosSelecionados.includes(s.id)
                    ? styles.servicoAtivo
                    : ''
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={form.servicosSelecionados.includes(s.id)}
                    onChange={() => toggleServico(s.id)}
                    className={styles.checkInput}
                  />

                  <div>

                    <span className={styles.servicoLabel}>
                      {s.label}
                    </span>

                    <span className={styles.servicoDesc}>
                      {s.descricao}
                    </span>

                  </div>

                </label>
              ))}

            </div>

          </section>

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              ENTREGA DO MATERIAL
            </h2>

            <div className={styles.entregaGrid}>

              {entregaMaterial.map((e) => (

                <label
                  key={e.id}
                  className={`${styles.radioLabel} ${form.entregaSelecionada.includes(e.id)
                    ? styles.radioAtivo
                    : ''
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={form.entregaSelecionada.includes(e.id)}
                    onChange={() => toggleEntrega(e.id)}
                    className={styles.checkInput}
                  />

                  {e.label}

                </label>
              ))}

            </div>

          </section>

          <section className={styles.secao}>

            <h2 className={styles.secaoTitulo}>
              INFORMAÇÕES ADICIONAIS
            </h2>

            <div className={styles.campo}>

              <label className={styles.label}>
                Referências
              </label>

              <input
                className={styles.input}
                value={form.referencias}
                onChange={set('referencias')}
              />

            </div>

            <div className={styles.campo}>

              <label className={styles.label}>
                Já trabalhou antes?
              </label>

              <input
                className={styles.input}
                value={form.trabalhouAntes}
                onChange={set('trabalhouAntes')}
              />

            </div>

            <div className={styles.campo}>

              <label className={styles.label}>
                Anexo referências
              </label>

              <input
                className={styles.input}
                value={form.anexoReferencias}
                onChange={set('anexoReferencias')}
              />

            </div>

          </section>

          <div className={styles.botoesRodape}>

            <button
              type="button"
              className={styles.btnCancelar}
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.btnEnviar}
            >
              Enviar solicitação
            </button>

          </div>

        </form>

      </main>

    </div>
  );
};

export default SolicitacaoServico;