    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    import Header from '../../Components/Header/Header';
    import styles from './PaginaEventos.module.css';

    const servicos = [
    { id: 'filmagem', label: 'FILMAGEM', descricao: 'Cobertura completa do evento em vídeo' },
    { id: 'fotografia', label: 'FOTOGRAFIA', descricao: 'Ensaio e cobertura fotográfica profissional' },
    { id: 'edicao', label: 'EDIÇÃO DE VÍDEO', descricao: 'Corte, trilha sonora, legendas e color grading' },
    { id: 'transmissao', label: 'TRANSMISSÃO AO VIVO', descricao: 'Streaming para YouTube, Instagram ou plataforma personalizada' },
    { id: 'drone', label: 'DRONE', descricao: 'Imagens aéreas do evento e do local' },
    { id: 'captacao', label: 'CAPTAÇÃO DE ÁUDIO', descricao: 'Microfones e equipamento de som profissional' },
    { id: 'making', label: 'MAKING OF/BASTIDORES', descricao: 'Cobertura dos preparativos antes do evento' },
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
        data: '25/07/2025',
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
        servicosSelecionados: prev.servicosSelecionados.includes(id)
            ? prev.servicosSelecionados.filter((s) => s !== id)
            : [...prev.servicosSelecionados, id],
        }));
    };

    const toggleEntrega = (id) => {
        setForm((prev) => ({
        ...prev,
        entregaSelecionada: prev.entregaSelecionada.includes(id)
            ? prev.entregaSelecionada.filter((e) => e !== id)
            : [...prev.entregaSelecionada, id],
        }));
    };

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleEnviar = (e) => {
        e.preventDefault();
        alert('Solicitação enviada com sucesso!');
    };

    return (
        <div className={styles.layout}>
        <Header />

        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleEnviar}>

            {/* SOBRE O EVENTO */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>SOBRE O EVENTO</h2>

                <div className={styles.campo}>
                <label className={styles.label}>Nome do evento</label>
                <input
                    className={styles.input}
                    placeholder="Ex: Casamento, Juca e Iara"
                    value={form.nomeEvento}
                    onChange={set('nomeEvento')}
                />
                </div>

                <div className={styles.row}>
                <div className={styles.campo}>
                    <label className={styles.label}>Tipo de evento</label>
                    <input
                    className={styles.input}
                    placeholder="Ex: Formatura"
                    value={form.tipoEvento}
                    onChange={set('tipoEvento')}
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>Porte do evento</label>
                    <input
                    className={styles.input}
                    placeholder="50 pessoas"
                    value={form.porteEvento}
                    onChange={set('porteEvento')}
                    />
                </div>
                </div>

                <div className={styles.campo}>
                <label className={styles.label}>Descrição</label>
                <textarea
                    className={styles.textarea}
                    rows={4}
                    value={form.descricao}
                    onChange={set('descricao')}
                />
                </div>
            </section>

            {/* DATA E HORÁRIO */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>DATA E HORÁRIO</h2>
                <div className={styles.row}>
                <div className={styles.campo}>
                    <label className={styles.label}>Data</label>
                    <input
                    className={styles.input}
                    placeholder="25/07/2025"
                    value={form.data}
                    onChange={set('data')}
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>Início</label>
                    <input
                    className={styles.input}
                    placeholder="--:--"
                    value={form.inicio}
                    onChange={set('inicio')}
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>Término</label>
                    <input
                    className={styles.input}
                    placeholder="--:--"
                    value={form.termino}
                    onChange={set('termino')}
                    />
                </div>
                </div>
            </section>

            {/* LOCAL */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>LOCAL</h2>

                <div className={styles.campo}>
                <label className={styles.label}>Nome do espaço / local</label>
                <input
                    className={styles.input}
                    placeholder="Ex: Espaço Garden"
                    value={form.nomeLocal}
                    onChange={set('nomeLocal')}
                />
                </div>

                <div className={styles.campo}>
                <label className={styles.label}>Endereço</label>
                <input
                    className={styles.input}
                    placeholder="Ex: Rua Dom José Gaspar"
                    value={form.endereco}
                    onChange={set('endereco')}
                />
                </div>

                <div className={styles.row}>
                <div className={styles.campo}>
                    <label className={styles.label}>Número</label>
                    <input
                    className={styles.input}
                    placeholder="Ex: 500"
                    value={form.numero}
                    onChange={set('numero')}
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>Bairro</label>
                    <input
                    className={styles.input}
                    placeholder="Ex: Coração Eucarístico"
                    value={form.bairro}
                    onChange={set('bairro')}
                    />
                </div>
                </div>

                <div className={styles.campo}>
                <label className={styles.label}>Tipo de ambiente</label>
                <div className={styles.radioGrid}>
                    {['Interno (coberto)', 'Externo (ao ar livre)', 'Misto', 'Ainda não sei'].map((op) => (
                    <label key={op} className={`${styles.radioLabel} ${form.tipoAmbiente === op ? styles.radioAtivo : ''}`}>
                        <input
                        type="radio"
                        name="tipoAmbiente"
                        value={op}
                        checked={form.tipoAmbiente === op}
                        onChange={set('tipoAmbiente')}
                        className={styles.radioInput}
                        />
                        {op}
                    </label>
                    ))}
                </div>
                </div>
            </section>

            {/* SERVIÇOS */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>SERVIÇOS</h2>
                <div className={styles.servicosList}>
                {servicos.map((s) => (
                    <label
                    key={s.id}
                    className={`${styles.servicoItem} ${form.servicosSelecionados.includes(s.id) ? styles.servicoAtivo : ''}`}
                    >
                    <input
                        type="checkbox"
                        checked={form.servicosSelecionados.includes(s.id)}
                        onChange={() => toggleServico(s.id)}
                        className={styles.checkInput}
                    />
                    <div>
                        <span className={styles.servicoLabel}>{s.label}</span>
                        <span className={styles.servicoDesc}>{s.descricao}</span>
                    </div>
                    </label>
                ))}
                </div>
            </section>

            {/* ENTREGA DO MATERIAL */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>ENTREGA DO MATERIAL</h2>

                <div className={styles.campo}>
                <label className={styles.label}>Tipo de entrega</label>
                <div className={styles.entregaGrid}>
                    {entregaMaterial.map((e) => (
                    <label
                        key={e.id}
                        className={`${styles.radioLabel} ${form.entregaSelecionada.includes(e.id) ? styles.radioAtivo : ''}`}
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
                </div>

                <div className={styles.row}>
                <div className={styles.campo}>
                    <label className={styles.label}>Prazo para entrega</label>
                    <input
                    className={styles.input}
                    placeholder="Até 7 dias"
                    value={form.prazoEntrega}
                    onChange={set('prazoEntrega')}
                    />
                </div>
                <div className={styles.campo}>
                    <label className={styles.label}>Quantidade de fotos editadas</label>
                    <input
                    className={styles.input}
                    placeholder="Até 100 fotos"
                    value={form.qtdFotos}
                    onChange={set('qtdFotos')}
                    />
                </div>
                </div>
            </section>

            {/* INFORMAÇÕES ADICIONAIS */}
            <section className={styles.secao}>
                <h2 className={styles.secaoTitulo}>INFORMAÇÕES ADICIONAIS</h2>

                <div className={styles.campo}>
                <label className={styles.label}>Referências visuais (links, nomes de canais, estilos)</label>
                <input
                    className={styles.input}
                    placeholder="Luz natural"
                    value={form.referencias}
                    onChange={set('referencias')}
                />
                </div>

                <div className={styles.campo}>
                <label className={styles.label}>Já trabalhou com algum fotógrafo/videomaker antes?</label>
                <div className={styles.radioGrid}>
                    {['Sim', 'Não, é minha primeira vez'].map((op) => (
                    <label
                        key={op}
                        className={`${styles.radioLabel} ${form.trabalhouAntes === op ? styles.radioAtivo : ''}`}
                    >
                        <input
                        type="radio"
                        name="trabalhouAntes"
                        value={op}
                        checked={form.trabalhouAntes === op}
                        onChange={set('trabalhouAntes')}
                        className={styles.radioInput}
                        />
                        {op}
                    </label>
                    ))}
                </div>
                </div>

                <div className={styles.campo}>
                <label className={styles.label}>Anexar referências ou inspirações (opcional)</label>
                <input
                    className={styles.input}
                    placeholder=""
                    value={form.anexoReferencias}
                    onChange={set('anexoReferencias')}
                />
                </div>

                <p className={styles.linkOrcamento}>
                Clique para código de orçamento
                </p>
            </section>

            {/* BOTÕES */}
            <div className={styles.botoesRodape}>
                <button
                type="button"
                className={styles.btnCancelar}
                onClick={() => navigate(-1)}
                >
                Cancelar
                </button>
                <button type="submit" className={styles.btnEnviar}>
                Enviar solicitação
                </button>
            </div>

            </form>
        </main>
        </div>
    );
    };

    export default SolicitacaoServico;