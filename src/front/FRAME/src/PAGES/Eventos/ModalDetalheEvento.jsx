import React, { useEffect, useState, useCallback } from 'react';
import styles from './ModalDetalheEvento.module.css';
import {
  buscarDetalheEvento,
  adicionarProfissionalAoEvento,
  removerEscala,
  trocarProfissional,
} from '../../services/escalaService';

const ModalDetalheEvento = ({ eventoId, profissionais, onFechar, onAtualizar }) => {
  const [detalhe, setDetalhe] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalTrocar, setModalTrocar] = useState(false);
  const [escalaParaTrocar, setEscalaParaTrocar] = useState(null);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState('');
  const [salvando, setSalvando] = useState(false);

  const admId = sessionStorage.getItem('usuarioId');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const data = await buscarDetalheEvento(eventoId);
      setDetalhe(data);
    } catch {
      setErro('Não foi possível carregar os dados do evento.');
    } finally {
      setCarregando(false);
    }
  }, [eventoId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const profissionaisDisponiveis = profissionais.filter(
    (p) => !detalhe?.profissionais?.some((ep) => ep.profissionalId === p.id)
  );

  const handleAdicionar = async () => {
    if (!profissionalSelecionado) return;
    setSalvando(true);
    setErro('');
    try {
      await adicionarProfissionalAoEvento({
        eventoId,
        profissionalId: Number(profissionalSelecionado),
        admId: Number(admId),
        diaSemana: '',
      });
      setProfissionalSelecionado('');
      setModalAdicionar(false);
      await carregar();
      onAtualizar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const handleRemover = async (escalaId) => {
    setSalvando(true);
    setErro('');
    try {
      await removerEscala(escalaId);
      await carregar();
      onAtualizar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const abrirModalTrocar = (escala) => {
    setEscalaParaTrocar(escala);
    setProfissionalSelecionado('');
    setModalTrocar(true);
  };

  const handleTrocar = async () => {
    if (!profissionalSelecionado || !escalaParaTrocar) return;
    setSalvando(true);
    setErro('');
    try {
      await trocarProfissional(escalaParaTrocar.escalaId, {
        novoProfissionalId: Number(profissionalSelecionado),
        admId: Number(admId),
      });
      setProfissionalSelecionado('');
      setModalTrocar(false);
      setEscalaParaTrocar(null);
      await carregar();
      onAtualizar();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const statusLabel = (s) => {
    const mapa = { PENDENTE: 'Pendente', ACEITA: 'Aceita', RECUSADA: 'Recusada' };
    return mapa[s] || s;
  };

  const statusClass = (s) => {
    if (s === 'ACEITA') return styles.statusAceita;
    if (s === 'RECUSADA') return styles.statusRecusada;
    return styles.statusPendente;
  };

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.btnFechar} onClick={onFechar}>✕</button>

        {carregando && <p className={styles.msg}>Carregando...</p>}
        {!carregando && erro && <p className={styles.erro}>{erro}</p>}

        {!carregando && detalhe && (
          <>
            <div className={styles.cabecalho}>
              <span className={styles.badge}>{detalhe.tipoEvento}</span>
              <h2 className={styles.titulo}>{detalhe.nomeEvento}</h2>
              <span className={styles.subtitulo}>{detalhe.nomeLocal} · {detalhe.bairro}</span>
            </div>

            <div className={styles.grid}>
              <div className={styles.campo}>
                <span className={styles.label}>Data</span>
                <span className={styles.valor}>{detalhe.data || '—'}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.label}>Horário</span>
                <span className={styles.valor}>{detalhe.inicio} — {detalhe.termino}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.label}>Porte</span>
                <span className={styles.valor}>{detalhe.porteEvento || '—'}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.label}>Ambiente</span>
                <span className={styles.valor}>{detalhe.tipoAmbiente || '—'}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.label}>Cliente</span>
                <span className={styles.valor}>{detalhe.nomeCliente || '—'}</span>
              </div>
              <div className={styles.campo}>
                <span className={styles.label}>Status</span>
                <span className={styles.valor}>{detalhe.status || '—'}</span>
              </div>
              {detalhe.descricao && (
                <div className={`${styles.campo} ${styles.campoFull}`}>
                  <span className={styles.label}>Descrição</span>
                  <span className={styles.valor}>{detalhe.descricao}</span>
                </div>
              )}
              {detalhe.servicosSelecionados && (
                <div className={`${styles.campo} ${styles.campoFull}`}>
                  <span className={styles.label}>Serviços</span>
                  <span className={styles.valor}>{detalhe.servicosSelecionados}</span>
                </div>
              )}
              {detalhe.entregaSelecionada && (
                <div className={styles.campo}>
                  <span className={styles.label}>Entrega</span>
                  <span className={styles.valor}>{detalhe.entregaSelecionada}</span>
                </div>
              )}
              {detalhe.prazoEntrega && (
                <div className={styles.campo}>
                  <span className={styles.label}>Prazo</span>
                  <span className={styles.valor}>{detalhe.prazoEntrega}</span>
                </div>
              )}
              {detalhe.qtdFotos && (
                <div className={styles.campo}>
                  <span className={styles.label}>Qtd. Fotos</span>
                  <span className={styles.valor}>{detalhe.qtdFotos}</span>
                </div>
              )}
            </div>

            <div className={styles.secaoProfissionais}>
              <div className={styles.secaoHeader}>
                <h3 className={styles.secaoTitulo}>Equipe escalada</h3>
                <button
                  className={styles.btnAdicionar}
                  onClick={() => { setProfissionalSelecionado(''); setModalAdicionar(true); }}
                  disabled={salvando || profissionaisDisponiveis.length === 0}
                >
                  + Adicionar profissional
                </button>
              </div>

              {detalhe.profissionais.length === 0 ? (
                <p className={styles.semProfissionais}>Nenhum profissional escalado ainda.</p>
              ) : (
                <ul className={styles.listaProfissionais}>
                  {detalhe.profissionais.map((p) => (
                    <li key={p.escalaId} className={styles.itemProfissional}>
                      <div className={styles.avatarProfissional}>
                        {p.nome?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className={styles.infoProfissional}>
                        <strong>{p.nome}</strong>
                        {p.telefone && <span>{p.telefone}</span>}
                      </div>
                      <span className={`${styles.statusEscala} ${statusClass(p.statusEscala)}`}>
                        {statusLabel(p.statusEscala)}
                      </span>
                      <div className={styles.acoesProfissional}>
                        <button
                          className={styles.btnTrocar}
                          onClick={() => abrirModalTrocar(p)}
                          disabled={salvando}
                        >
                          Trocar
                        </button>
                        <button
                          className={styles.btnRemover}
                          onClick={() => handleRemover(p.escalaId)}
                          disabled={salvando}
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {modalAdicionar && (
          <div className={styles.subOverlay} onClick={() => setModalAdicionar(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <h3>Adicionar profissional</h3>
              {erro && <p className={styles.erro}>{erro}</p>}
              <select
                className={styles.select}
                value={profissionalSelecionado}
                onChange={(e) => setProfissionalSelecionado(e.target.value)}
              >
                <option value="">Selecione um profissional</option>
                {profissionaisDisponiveis.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
              <div className={styles.subAcoes}>
                <button className={styles.btnCancelar} onClick={() => setModalAdicionar(false)}>Cancelar</button>
                <button
                  className={styles.btnConfirmar}
                  onClick={handleAdicionar}
                  disabled={!profissionalSelecionado || salvando}
                >
                  {salvando ? 'Salvando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {modalTrocar && escalaParaTrocar && (
          <div className={styles.subOverlay} onClick={() => setModalTrocar(false)}>
            <div className={styles.subModal} onClick={(e) => e.stopPropagation()}>
              <h3>Trocar profissional</h3>
              <p className={styles.trocarInfo}>Substituindo: <strong>{escalaParaTrocar.nome}</strong></p>
              {erro && <p className={styles.erro}>{erro}</p>}
              <select
                className={styles.select}
                value={profissionalSelecionado}
                onChange={(e) => setProfissionalSelecionado(e.target.value)}
              >
                <option value="">Selecione o novo profissional</option>
                {profissionaisDisponiveis.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
              <div className={styles.subAcoes}>
                <button className={styles.btnCancelar} onClick={() => setModalTrocar(false)}>Cancelar</button>
                <button
                  className={styles.btnConfirmar}
                  onClick={handleTrocar}
                  disabled={!profissionalSelecionado || salvando}
                >
                  {salvando ? 'Salvando...' : 'Confirmar troca'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetalheEvento;