import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import ModalDetalheEvento from '../Eventos/ModalDetalheEvento';
import styles from './EscalaEquipe.module.css';
import { API_BASE_URL } from '../../utils/api';

const EscalaEquipe = () => {
  const dias = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];
  const [eventos, setEventos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [escalas, setEscalas] = useState([]);
  const [modalEventos, setModalEventos] = useState(false);
  const [modalProfissionais, setModalProfissionais] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(false);
  const [escalaSelecionada, setEscalaSelecionada] = useState(null);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [buscaEvento, setBuscaEvento] = useState("");

  const buscarEventos = async () => {
    const response = await fetch(`${API_BASE_URL}/eventos`);
    const data = await response.json();
    setEventos(data);
  };

  const buscarProfissionais = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profissionais`);
    const data = await response.json();
    setProfissionais(data.filter((p) => p.tipo === "prestador"));
  };

  const buscarEscalas = async () => {
    const response = await fetch(`${API_BASE_URL}/api/escalas/aceitas`);
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
    setBuscaEvento("");
    setModalEventos(true);
  };

  const selecionarEvento = (evento) => {
    setEventoSelecionado(evento);
    setModalEventos(false);
    setModalProfissionais(true);
  };

  const salvarEscala = async () => {
    await fetch(`${API_BASE_URL}/api/escalas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventoId: eventoSelecionado.id,
        profissionalId: profissionalSelecionado.id,
        admId: sessionStorage.getItem("usuarioId"),
        diaSemana: diaSelecionado
      })
    });
    await buscarEscalas();
    setModalProfissionais(false);
  };

  // Função para voltar do modal de confirmação para o de eventos
  const voltarParaEventos = () => {
    setModalProfissionais(false);
    setModalEventos(true);
  };

  const abrirDetalhes = (escala) => {
    setEscalaSelecionada(escala);
    setModalDetalhes(true);
  };

  const fecharDetalhes = () => {
    setModalDetalhes(false);
    setEscalaSelecionada(null);
  };

  const buscarEscala = (profissionalNome, dia) => {
    return escalas.find(
      (escala) => escala.nomeProfissional === profissionalNome && escala.diaSemana === dia
    );
  };

  const eventosFiltrados = eventos.filter((evento) =>
    evento.nomeEvento?.toLowerCase().includes(buscaEvento.toLowerCase())
  );

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.pagina}>
        <h1>Escala de Equipe</h1>
        <div className={styles.tabela}>
          <div className={styles.header}>
            <div className={styles.colaborador}>Colaborador</div>
            {dias.map((dia) => (
              <div key={dia} className={styles.dia}><strong>{dia}</strong></div>
            ))}
          </div>
          {profissionais.map((profissional) => (
            <div key={profissional.id} className={styles.linha}>
              <div className={styles.profissional}>
                <div className={styles.avatar}>
                  {profissional.fotoPerfil ? (
                    <img src={profissional.fotoPerfil} alt={`Foto de ${profissional.nome}`} className={styles.avatarImg} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    profissional.nome?.charAt(0)?.toUpperCase()
                  )}
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
                      <div className={styles.cardEscala} onClick={() => abrirDetalhes(escala)}>
                        <div className={styles.topoEvento}>
                          <div className={styles.infoEvento}>
                            <span className={styles.tipoEvento}>EVENTO</span>
                            <strong className={styles.nomeEvento}>{escala.nomeEvento}</strong>
                          </div>
                        </div>
                        <div className={styles.metaEvento}>📅 {escala.diaSemana}</div>
                        <div className={styles.status}>Confirmado</div>
                      </div>
                    ) : (
                      <button className={styles.botaoMais} onClick={() => abrirEventos(profissional, dia)}>+</button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* MODAL SELECIONAR EVENTO */}
        {modalEventos && (
          <div className={styles.overlay} onClick={() => setModalEventos(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.cabecalhoModal}>
                <h2>Selecionar Evento</h2>
                <button className={styles.btnFecharModal} onClick={() => setModalEventos(false)}>✕</button>
              </div>
              <input type="text" className={styles.inputBusca} placeholder="Buscar evento..." value={buscaEvento} onChange={(e) => setBuscaEvento(e.target.value)} />
              <div className={styles.listaEventos}>
                {eventosFiltrados.length === 0 ? (
                  <p className={styles.semEventos}>Nenhum evento encontrado.</p>
                ) : (
                  eventosFiltrados.map((evento) => (
                    <div key={evento.id} className={styles.card} onClick={() => selecionarEvento(evento)}>
                      <strong>{evento.nomeEvento}</strong>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      {/* MODAL CONFIRMAR ESCALA */}
{modalProfissionais && (
  <div className={styles.overlay} onClick={voltarParaEventos}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.cabecalhoModal}>
        <h2>Confirmar Escala</h2>
        <button className={styles.btnFecharModal} onClick={voltarParaEventos}>✕</button>
      </div>
      
      {eventoSelecionado && (
        <div className={styles.corpoModalConfirmacao}>
          <p>
            Deseja escalar <strong>{profissionalSelecionado?.nome}</strong> para o evento <strong>{eventoSelecionado.nomeEvento}</strong> na <strong>{diaSelecionado}</strong>?
          </p>
        </div>
      )}

      {/* Usando as classes nativas do seu CSS para manter o padrão visual */}
      <div className={styles.rodapeModalConfirmacao}>
        <button className={styles.botaoAtribuir} onClick={salvarEscala}>
          Confirmar
        </button>
        <button className={styles.btnFecharRodape} onClick={voltarParaEventos}>
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

        {modalDetalhes && escalaSelecionada && (
          <ModalDetalheEvento
            eventoId={escalaSelecionada.eventoId}
            profissionais={profissionais}
            onFechar={fecharDetalhes}
            onAtualizar={buscarEscalas}
          />
        )}
      </main>
    </div>
  );
};

export default EscalaEquipe;