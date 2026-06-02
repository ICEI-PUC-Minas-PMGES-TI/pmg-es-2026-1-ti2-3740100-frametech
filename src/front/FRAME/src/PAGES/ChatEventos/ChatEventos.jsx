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

  const [eventos, setEventos] =
    useState([]);

  const [
    eventoSelecionado,
    setEventoSelecionado
  ] = useState(null);

  const [mensagens, setMensagens] =
    useState([]);

  const [texto, setTexto] =
    useState('');

  const mensagensRef =
    useRef(null);

  async function buscarEventos() {

    try {

      const response =
        await axios.get(
          `http://localhost:8080/chat/eventos/${usuarioId}`
        );

      setEventos(response.data);

      if (
        response.data.length > 0 &&
        !eventoSelecionado
      ) {

        setEventoSelecionado(
          response.data[0]
        );
      }

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarMensagens() {

    if (!eventoSelecionado) return;

    try {

      const response =
        await axios.get(
          `http://localhost:8080/chat/mensagens/${eventoSelecionado.id}`
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
            eventoSelecionado.id
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

      await buscarEventos();

    };

    carregar();

  }, []);

  useEffect(() => {

    if (!eventoSelecionado) return;

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

  }, [eventoSelecionado]);

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

            {eventos.map((evento) => (

              <button
                key={evento.id}
                className={`${styles.eventoItem}
                ${
                  eventoSelecionado?.id === evento.id
                    ? styles.eventoAtivo
                    : ''
                }`}
                onClick={() =>
                  setEventoSelecionado(evento)
                }
              >

                <div
                  className={styles.eventoNome}
                >
                  {evento.nomeEvento}
                </div>

                <div
                  className={styles.eventoLocal}
                >
                  {evento.nomeLocal}
                </div>

              </button>

            ))}

          </div>

        </div>

        <div className={styles.chatArea}>

          {eventoSelecionado ? (

            <>

              <div className={styles.chatHeader}>

                <div>

                  <h2
                    className={styles.chatTitulo}
                  >
                    {
                      eventoSelecionado.nomeEvento
                    }
                  </h2>

                  <span
                    className={styles.chatSub}
                  >
                    {
                      eventoSelecionado.nomeLocal
                    }
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