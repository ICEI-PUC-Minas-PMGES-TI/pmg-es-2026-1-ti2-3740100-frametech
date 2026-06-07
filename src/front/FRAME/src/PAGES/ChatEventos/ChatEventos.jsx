import React, {
  useEffect,
  useState,
  useRef
} from 'react';

import axios from 'axios';

import Header from '../../Components/Header/Header';

import styles from './ChatEventos.module.css';

const ChatEventos = () => {

  const usuarioId =
    sessionStorage.getItem('usuarioId');

  const [contatos, setContatos] =
    useState([]);

  const [contatoSelecionado, setContatoSelecionado] =
    useState(null);

  const [mensagens, setMensagens] =
    useState([]);

  const [texto, setTexto] =
    useState('');

  const mensagensRef =
    useRef(null);

  async function buscarContatos() {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/chat/contatos/${usuarioId}`
        );

      setContatos(response.data);

      if (
        response.data.length > 0 &&
        !contatoSelecionado
      ) {

        setContatoSelecionado(
          response.data[0]
        );
      }

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarMensagens() {

    if (!contatoSelecionado) return;

    try {

      const response =
        await axios.get(
          `http://localhost:8080/chat/mensagens/${contatoSelecionado.eventoId}`
        );

      setMensagens(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  async function enviarMensagem() {

    if (!texto.trim()) return;

    try {

      await axios.post(
        'http://localhost:8080/chat/enviar',
        {
          mensagem: texto,
          usuarioId,
          eventoId:
            contatoSelecionado.eventoId
        }
      );

      setTexto('');

      buscarMensagens();

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    const carregar = async () => {

      await buscarContatos();

    };

    carregar();

  }, []);

  useEffect(() => {

    if (!contatoSelecionado) return;

    const carregarMensagens =
      async () => {

        await buscarMensagens();

      };

    carregarMensagens();

    const interval =
      setInterval(() => {

        carregarMensagens();

      }, 2000);

    return () =>
      clearInterval(interval);

  }, [contatoSelecionado]);

  useEffect(() => {

    if (mensagensRef.current) {

      mensagensRef.current.scrollTop =
        mensagensRef.current.scrollHeight;
    }

  }, [mensagens]);

  return (
    <div className={styles.layout}>

      <Header />

      <main className={styles.main}>

        <div className={styles.sidebarChat}>

          <h2 className={styles.titulo}>
            Conversas
          </h2>

          <div className={styles.listaEventos}>

            {contatos.map((contato) => (

              <button
                key={`${contato.eventoId}-${contato.usuarioId}-${contato.descricao}`}
                className={`${styles.eventoItem}
                ${
                  contatoSelecionado?.eventoId === contato.eventoId &&
                  contatoSelecionado?.usuarioId === contato.usuarioId &&
                  contatoSelecionado?.descricao === contato.descricao
                    ? styles.eventoAtivo
                    : ''
                }`}
                onClick={() =>
                  setContatoSelecionado(contato)
                }
              >

                <div
                  className={styles.eventoNome}
                >
                  {contato.nomeUsuario}
                </div>

                <div
                  className={styles.eventoLocal}
                >
                  {contato.tipoUsuario} · {contato.descricao}
                </div>

                <div
                  className={styles.eventoLocal}
                >
                  Evento: {contato.nomeEvento}
                </div>

              </button>

            ))}

          </div>

        </div>

        <div className={styles.chatArea}>

          {contatoSelecionado ? (

            <>

              <div className={styles.chatHeader}>

                <div>

                  <h2
                    className={styles.chatTitulo}
                  >
                    {contatoSelecionado.nomeUsuario}
                  </h2>

                  <span
                    className={styles.chatSub}
                  >
                    {contatoSelecionado.nomeEvento}
                    {contatoSelecionado.nomeLocal
                      ? ` · ${contatoSelecionado.nomeLocal}`
                      : ''}
                  </span>

                </div>

              </div>

              <div
                className={styles.mensagens}
                ref={mensagensRef}
              >

                {mensagens.map((msg) => (

                  <div
                    key={msg.id}
                    className={`${styles.mensagemWrapper}
                    ${
                      Number(msg.usuario.id) ===
                      Number(usuarioId)
                        ? styles.minhaMensagem
                        : styles.outraMensagem
                    }`}
                  >

                    <div
                      className={styles.mensagem}
                    >

                      <span
                        className={styles.nome}
                      >
                        {msg.usuario.nome}
                      </span>

                      <span
                        className={styles.texto}
                      >
                        {msg.mensagem}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

              <div className={styles.inputArea}>

                <input
                  value={texto}
                  onChange={(e) =>
                    setTexto(e.target.value)
                  }
                  className={styles.input}
                  placeholder="Digite uma mensagem"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      enviarMensagem();
                    }
                  }}
                />

                <button
                  onClick={enviarMensagem}
                  className={styles.botao}
                >
                  Enviar
                </button>

              </div>

            </>

          ) : (

            <div className={styles.semChat}>
              Nenhum chat disponível
            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default ChatEventos;
