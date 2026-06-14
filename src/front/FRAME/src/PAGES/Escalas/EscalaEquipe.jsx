import React, {
  useEffect,
  useState
} from 'react';

import Header from '../../Components/Header/Header';
import styles from './EscalaEquipe.module.css';

const EscalaEquipe = () => {

  const dias = [
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SAB",
    "DOM"
  ];

  const [eventos, setEventos] =
    useState([]);

  const [profissionais, setProfissionais] =
    useState([]);

  const [escalas, setEscalas] =
    useState([]);

  const [modalEventos, setModalEventos] =
    useState(false);

  const [modalProfissionais, setModalProfissionais] =
    useState(false);

  // 1. Adicionado junto dos outros states
  const [modalDetalhes, setModalDetalhes] =
    useState(false);

  const [detalhesEvento, setDetalhesEvento] =
    useState(null);

  const [escalaSelecionada, setEscalaSelecionada] =
    useState(null);

  const [eventoSelecionado, setEventoSelecionado] =
    useState(null);

  const [diaSelecionado, setDiaSelecionado] =
    useState("");

  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState(null);

  const buscarEventos = async () => {
    const response = await fetch(
      'http://localhost:8080/eventos'
    );
    const data = await response.json();
    setEventos(data);
  };

  const buscarProfissionais = async () => {
    const response = await fetch(
      'http://localhost:8080/auth/profissionais'
    );
    const data = await response.json();
    setProfissionais(
      data.filter((p) => p.tipo === "prestador")
    );
  };

  const buscarEscalas = async () => {
    const response = await fetch(
      'http://localhost:8080/api/escalas/aceitas'
    );
    const data = await response.json();
    setEscalas(data);
  };

  useEffect(() => {
    const carregar = async () => {
      await buscarEventos();
      await buscarProfissionais();
      await buscarEscalas();
    };
    carregar();
  }, []);

  const abrirEventos = (profissional, dia) => {
    setProfissionalSelecionado(profissional);
    setDiaSelecionado(dia);
    setModalEventos(true);
  };

  const selecionarEvento = (evento) => {
    setEventoSelecionado(evento);
    setModalEventos(false);
    setModalProfissionais(true);
  };

  const salvarEscala = async () => {
    await fetch(
      'http://localhost:8080/api/escalas',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventoId: eventoSelecionado.id,
          profissionalId: profissionalSelecionado.id,
          admId: sessionStorage.getItem("usuarioId"),
          diaSemana: diaSelecionado
        })
      }
    );

    await buscarEscalas();
    setModalProfissionais(false);
  };

  // 2. Adicionado abaixo de salvarEscala
  const abrirDetalhes = async (escala) => {
    const response = await fetch(
      `http://localhost:8080/api/escalas/evento/${escala.eventoId}/detalhe`
    );
    const data = await response.json();
    setDetalhesEvento(data);
    setEscalaSelecionada(escala);
    setModalDetalhes(true);
  };

  // 3. Adicionado o método para remover o profissional e atualizar os detalhes
  const removerProfissional = async (escalaId) => {
    await fetch(
      `http://localhost:8080/api/escalas/${escalaId}`,
      {
        method: 'DELETE'
      }
    );

    await buscarEscalas();

    const response = await fetch(
      `http://localhost:8080/api/escalas/evento/${escalaSelecionada.eventoId}/detalhe`
    );
    const data = await response.json();
    setDetalhesEvento(data);
  };

  const buscarEscala = (profissionalNome, dia) => {
    return escalas.find(
      (escala) =>
        escala.nomeProfissional === profissionalNome &&
        escala.diaSemana === dia
    );
  };

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.pagina}>
        <h1>Escala de Equipe</h1>

        <div className={styles.tabela}>
          <div className={styles.header}>
            <div className={styles.colaborador}>
              Colaborador
            </div>

            {dias.map((dia) => (
              <div key={dia} className={styles.dia}>
                <strong>{dia}</strong>
              </div>
            ))}
          </div>

          {profissionais.map((profissional) => (
            <div key={profissional.id} className={styles.linha}>
              <div className={styles.profissional}>
                <div className={styles.avatar}>
                  {profissional.nome?.charAt(0)?.toUpperCase()}
                </div>

                <div className={styles.infoProfissional}>
                  <strong>{profissional.nome}</strong>
                  <span>Prestador</span>
                </div>
              </div>

              {dias.map((dia) => {
                const escala = buscarEscala(profissional.nome, dia);

                return (
                  <div key={dia} className={styles.celula}>
                    {escala ? (
                      /* 4. Trocado para incluir o onClick={() => abrirDetalhes(escala)} */
                      <div
                        className={styles.cardEscala}
                        onClick={() => abrirDetalhes(escala)}
                      >
                        <div className={styles.topoEvento}>
                          <div className={styles.infoEvento}>
                            <span className={styles.tipoEvento}>
                              EVENTO
                            </span>
                            <strong className={styles.nomeEvento}>
                              {escala.nomeEvento}
                            </strong>
                          </div>
                        </div>

                        <div className={styles.metaEvento}>
                          📅 {escala.diaSemana}
                        </div>

                        <div className={styles.status}>
                          Confirmado
                        </div>
                      </div>
                    ) : (
                      <button
                        className={styles.botaoMais}
                        onClick={() => abrirEventos(profissional, dia)}
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {modalEventos && (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <h2>Selecionar Evento</h2>
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className={styles.card}
                  onClick={() => selecionarEvento(evento)}
                >
                  <strong>{evento.nomeEvento}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {modalProfissionais && (
          <div className={styles.overlay}>
            <div className={styles.modal}>
              <h2>Confirmar Escala</h2>
              <button
                className={styles.botaoAtribuir}
                onClick={salvarEscala}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* 5. Adicionado antes do fechamento do </main> */}
        {modalDetalhes && detalhesEvento && (
          <div className={styles.overlay}>
            <div className={styles.modalDetalhes}>
              <h2>{detalhesEvento.nomeEvento}</h2>

              <p><strong>Cliente:</strong> {detalhesEvento.nomeCliente}</p>
              <p><strong>Data:</strong> {detalhesEvento.data}</p>
              <p><strong>Horário:</strong> {detalhesEvento.inicio} às {detalhesEvento.termino}</p>
              <p><strong>Local:</strong> {detalhesEvento.nomeLocal}</p>
              <p><strong>Endereço:</strong> {detalhesEvento.endereco}</p>
              <p><strong>Bairro:</strong> {detalhesEvento.bairro}</p>
              <p><strong>Descrição:</strong> {detalhesEvento.descricao}</p>

              <h3>Profissionais</h3>

              {detalhesEvento.profissionais?.map((profissional) => (
                <div key={profissional.escalaId} className={styles.itemProfissional}>
                  <div>
                    <strong>{profissional.nome}</strong>
                    <p>{profissional.telefone}</p>
                  </div>
                  <button
                    className={styles.btnRemover}
                    onClick={() => removerProfissional(profissional.escalaId)}
                  >
                    Remover
                  </button>
                </div>
              ))}

              <button
                className={styles.botaoFechar}
                onClick={() => setModalDetalhes(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default EscalaEquipe;