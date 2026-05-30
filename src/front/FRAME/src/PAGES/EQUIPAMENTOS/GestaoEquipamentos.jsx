import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import styles from './GestaoEquipamentos.module.css';

const formInicial = {
  nome: '',
  tipo: '',
  patrimonio: '',
  descricao: '',
  status: 'DISPONIVEL'
};


const meses = [
  'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function criarDataLocal(dataTexto) {
  if (!dataTexto) return null;

  if (typeof dataTexto === 'string' && dataTexto.includes('-')) {
    const [ano, mes, dia] = dataTexto.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  return new Date(dataTexto);
}

function formatarData(dataTexto) {
  const data = criarDataLocal(dataTexto);
  if (!data || Number.isNaN(data.getTime())) return dataTexto;

  return data.toLocaleDateString('pt-BR');
}

export default function GestaoEquipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [form, setForm] = useState(formInicial);
  const [editandoId, setEditandoId] = useState(null);
  const [eventoId, setEventoId] = useState('');
  const [equipamentoId, setEquipamentoId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [equipamentoCalendario, setEquipamentoCalendario] = useState(null);
  const [mesCalendario, setMesCalendario] = useState(new Date());

  const carregarDados = async () => {
    const [equipamentosResp, eventosResp, associacoesResp] = await Promise.all([
      fetch('http://localhost:8080/equipamentos'),
      fetch('http://localhost:8080/eventos'),
      fetch('http://localhost:8080/equipamentos/associacoes')
    ]);

    setEquipamentos(await equipamentosResp.json());
    setEventos(await eventosResp.json());
    setAssociacoes(await associacoesResp.json());
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const atualizarCampo = (campo) => (e) => {
    setForm({ ...form, [campo]: e.target.value });
  };

  const limparMensagens = () => {
    setMensagem('');
    setErro('');
  };

  const salvarEquipamento = async (e) => {
    e.preventDefault();
    limparMensagens();

    const url = editandoId
      ? `http://localhost:8080/equipamentos/${editandoId}`
      : 'http://localhost:8080/equipamentos';

    const metodo = editandoId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setErro('Erro ao salvar equipamento.');
      return;
    }

    setForm(formInicial);
    setEditandoId(null);
    setMensagem('Equipamento salvo com sucesso.');
    await carregarDados();
  };

  const editarEquipamento = (equipamento) => {
    limparMensagens();
    setEditandoId(equipamento.id);
    setForm({
      nome: equipamento.nome || '',
      tipo: equipamento.tipo || '',
      patrimonio: equipamento.patrimonio || '',
      descricao: equipamento.descricao || '',
      status: equipamento.status || 'DISPONIVEL'
    });
  };

  const excluirEquipamento = async (id) => {
    limparMensagens();

    await fetch(`http://localhost:8080/equipamentos/${id}`, {
      method: 'DELETE'
    });

    setMensagem('Equipamento excluido.');
    await carregarDados();
  };

  const associarEquipamento = async (e) => {
    e.preventDefault();
    limparMensagens();

    const response = await fetch('http://localhost:8080/equipamentos/associar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventoId, equipamentoId })
    });

    if (!response.ok) {
      const texto = await response.text();
      setErro(texto || 'Equipamento indisponivel para este evento.');
      return;
    }

    setEventoId('');
    setEquipamentoId('');
    setMensagem('Equipamento associado ao evento.');
    await carregarDados();
  };

  const removerAssociacao = async (id) => {
    limparMensagens();

    await fetch(`http://localhost:8080/equipamentos/associacoes/${id}`, {
      method: 'DELETE'
    });

    setMensagem('Associacao removida.');
    await carregarDados();
  };

  const abrirCalendario = (equipamento) => {
    setEquipamentoCalendario(equipamento);
    setMesCalendario(new Date());
  };

  const fecharCalendario = () => {
    setEquipamentoCalendario(null);
  };

  const trocarMes = (quantidade) => {
    setMesCalendario((mesAtual) => {
      const novoMes = new Date(mesAtual);
      novoMes.setMonth(novoMes.getMonth() + quantidade);
      return novoMes;
    });
  };

  const agendaDoEquipamento = equipamentoCalendario
    ? associacoes.filter((associacao) => associacao.equipamentoId === equipamentoCalendario.id)
    : [];

  const montarDiasDoCalendario = () => {
    const ano = mesCalendario.getFullYear();
    const mes = mesCalendario.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const dias = [];

    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const data = new Date(ano, mes, dia);
      const ocupacoes = agendaDoEquipamento.filter((associacao) => {
        const dataAssociacao = criarDataLocal(associacao.data);
        return (
          dataAssociacao &&
          dataAssociacao.getFullYear() === ano &&
          dataAssociacao.getMonth() === mes &&
          dataAssociacao.getDate() === dia
        );
      });

      dias.push({ dia, data, ocupacoes });
    }

    return dias;
  };

  const diasCalendario = montarDiasDoCalendario();

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <div className={styles.topo}>
          <div>
            <h1 className={styles.titulo}>Gestao de Equipamentos</h1>
            <p className={styles.subtitulo}>
              Cadastre equipamentos, associe aos eventos e acompanhe disponibilidade.
            </p>
          </div>
        </div>

        {erro && <div className={styles.mensagemErro}>{erro}</div>}
        {mensagem && <div className={styles.mensagemSucesso}>{mensagem}</div>}

        <div className={styles.grade}>
          <section className={styles.card}>
            <h2>{editandoId ? 'Editar equipamento' : 'Cadastro manual de equipamento'}</h2>

            <form className={styles.form} onSubmit={salvarEquipamento}>
              <div className={styles.campo}>
                <label>Nome</label>
                <input
                  className={styles.input}
                  value={form.nome}
                  onChange={atualizarCampo('nome')}
                  placeholder="Ex: Camera Sony A7"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label>Tipo</label>
                <select
                  className={styles.select}
                  value={form.tipo}
                  onChange={atualizarCampo('tipo')}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Camera">Camera</option>
                  <option value="Lente">Lente</option>
                  <option value="Drone">Drone</option>
                  <option value="Iluminacao">Iluminacao</option>
                  <option value="Audio">Audio</option>
                  <option value="Acessorio">Acessorio</option>
                </select>
              </div>

              <div className={styles.campo}>
                <label>Patrimonio / Codigo</label>
                <input
                  className={styles.input}
                  value={form.patrimonio}
                  onChange={atualizarCampo('patrimonio')}
                  placeholder="Ex: EQP-001"
                />
              </div>

              <div className={styles.campo}>
                <label>Status</label>
                <select
                  className={styles.select}
                  value={form.status}
                  onChange={atualizarCampo('status')}
                >
                  <option value="DISPONIVEL">Disponivel</option>
                  <option value="OCUPADO">Ocupado</option>
                </select>
              </div>

              <div className={styles.campo}>
                <label>Descricao</label>
                <textarea
                  className={styles.textarea}
                  value={form.descricao}
                  onChange={atualizarCampo('descricao')}
                  placeholder="Observacoes do equipamento"
                />
              </div>

              <button className={styles.botaoPrincipal} type="submit">
                {editandoId ? 'Salvar alteracoes' : 'Cadastrar equipamento'}
              </button>

              {editandoId && (
                <button
                  className={styles.botaoSecundario}
                  type="button"
                  onClick={() => {
                    setEditandoId(null);
                    setForm(formInicial);
                  }}
                >
                  Cancelar edicao
                </button>
              )}
            </form>

            <div className={styles.associacao}>
              <h2>Associar equipamento ao evento</h2>

              <form className={styles.form} onSubmit={associarEquipamento}>
                <div className={styles.campo}>
                  <label>Evento</label>
                  <select
                    className={styles.select}
                    value={eventoId}
                    onChange={(e) => setEventoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um evento</option>
                    {eventos.map((evento) => (
                      <option key={evento.id} value={evento.id}>
                        {evento.nomeEvento} - {formatarData(evento.data)} ({evento.inicio} as {evento.termino})
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.campo}>
                  <label>Equipamento</label>
                  <select
                    className={styles.select}
                    value={equipamentoId}
                    onChange={(e) => setEquipamentoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um equipamento</option>
                    {equipamentos.map((equipamento) => (
                      <option key={equipamento.id} value={equipamento.id}>
                        {equipamento.nome} - {equipamento.status}
                      </option>
                    ))}
                  </select>
                </div>

                <button className={styles.botaoPrincipal} type="submit">
                  Associar ao evento
                </button>
              </form>
            </div>
          </section>

          <section className={styles.card}>
            <h2>Equipamentos cadastrados</h2>

            <div className={styles.lista}>
              {equipamentos.map((equipamento) => (
                <article key={equipamento.id} className={styles.equipamento}>
                  <div className={styles.equipamentoTopo}>
                    <div>
                      <h3>{equipamento.nome}</h3>
                      <p className={styles.info}>{equipamento.tipo} · {equipamento.patrimonio}</p>
                    </div>

                    <span
                      className={
                        equipamento.status === 'OCUPADO'
                          ? styles.statusOcupado
                          : styles.statusDisponivel
                      }
                    >
                      {equipamento.status === 'OCUPADO' ? 'Ocupado' : 'Disponivel'}
                    </span>
                  </div>

                  <p className={styles.info}>{equipamento.descricao}</p>

                  <div className={styles.acoes}>
                    <button
                      className={styles.botaoSecundario}
                      type="button"
                      onClick={() => editarEquipamento(equipamento)}
                    >
                      Editar
                    </button>

                    <button
                      className={styles.botaoPerigo}
                      type="button"
                      onClick={() => excluirEquipamento(equipamento.id)}
                    >
                      Excluir
                    </button>

                    <button
                      className={styles.botaoCalendario}
                      type="button"
                      onClick={() => abrirCalendario(equipamento)}
                    >
                      Ver calendario
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.associacao}>
              <h2>Equipamentos associados aos eventos</h2>

              <div className={styles.associacoesLista}>
                {associacoes.map((associacao) => (
                  <div key={associacao.id} className={styles.associacaoItem}>
                    <div>
                      <strong>{associacao.nomeEquipamento}</strong>
                      <p className={styles.info}>
                        {associacao.nomeEvento} · {formatarData(associacao.data)} · {associacao.inicio} as {associacao.termino}
                      </p>
                    </div>

                    <button
                      className={styles.botaoPerigo}
                      type="button"
                      onClick={() => removerAssociacao(associacao.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                {associacoes.length === 0 && (
                  <p className={styles.info}>Nenhum equipamento associado ainda.</p>
                )}
              </div>
            </div>
          </section>
        </div>


        {equipamentoCalendario && (
          <div className={styles.modalFundo}>
            <div className={styles.modalCalendario}>
              <div className={styles.modalTopo}>
                <div>
                  <h2>Calendario do equipamento</h2>
                  <p>{equipamentoCalendario.nome}</p>
                </div>

                <button className={styles.botaoFechar} type="button" onClick={fecharCalendario}>
                  X
                </button>
              </div>

              <div className={styles.controleMes}>
                <button type="button" onClick={() => trocarMes(-1)}>Mes anterior</button>
                <strong>{meses[mesCalendario.getMonth()]} {mesCalendario.getFullYear()}</strong>
                <button type="button" onClick={() => trocarMes(1)}>Proximo mes</button>
              </div>

              <div className={styles.legenda}>
                <span><b className={styles.bolinhaLivre}></b> Livre</span>
                <span><b className={styles.bolinhaOcupado}></b> Ocupado</span>
              </div>

              <div className={styles.calendarioGradeSemana}>
                {diasSemana.map((dia) => (
                  <strong key={dia}>{dia}</strong>
                ))}
              </div>

              <div className={styles.calendarioGrade}>
                {diasCalendario.map((item, index) => (
                  item ? (
                    <div
                      key={`${item.dia}-${index}`}
                      className={item.ocupacoes.length > 0 ? styles.diaOcupado : styles.diaLivre}
                    >
                      <strong>{item.dia}</strong>
                      {item.ocupacoes.length > 0 ? (
                        item.ocupacoes.map((ocupacao) => (
                          <span key={ocupacao.id}>
                            {ocupacao.nomeEvento}<br />
                            {ocupacao.inicio} as {ocupacao.termino}
                          </span>
                        ))
                      ) : (
                        <span>Livre</span>
                      )}
                    </div>
                  ) : (
                    <div key={`vazio-${index}`} className={styles.diaVazio}></div>
                  )
                ))}
              </div>

              <div className={styles.agendaLista}>
                <h3>Agenda deste equipamento</h3>

                {agendaDoEquipamento.length === 0 && (
                  <p className={styles.info}>Este equipamento ainda nao esta associado a nenhum evento.</p>
                )}

                {agendaDoEquipamento.map((item) => (
                  <div key={item.id} className={styles.agendaItem}>
                    <strong>{formatarData(item.data)}</strong>
                    <span>{item.nomeEvento} · {item.inicio} as {item.termino}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
