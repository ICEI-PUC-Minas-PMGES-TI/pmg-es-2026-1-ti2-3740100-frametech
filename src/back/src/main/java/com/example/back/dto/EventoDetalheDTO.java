package com.example.back.dto;

import com.example.back.model.Evento;
import com.example.back.model.Escala;

import java.util.List;
import java.util.stream.Collectors;

public class EventoDetalheDTO {

    private Long id;
    private String nomeEvento;
    private String tipoEvento;
    private String porteEvento;
    private String descricao;
    private String data;
    private String inicio;
    private String termino;
    private String nomeLocal;
    private String endereco;
    private String numero;
    private String bairro;
    private String tipoAmbiente;
    private String servicosSelecionados;
    private String entregaSelecionada;
    private String prazoEntrega;
    private String qtdFotos;
    private String status;
    private String nomeCliente;

   
    private List<ProfissionalEscalaDTO> profissionais;

    public EventoDetalheDTO(Evento evento, List<Escala> escalas) {
        this.id                   = evento.getId();
        this.nomeEvento           = evento.getNomeEvento();
        this.tipoEvento           = evento.getTipoEvento();
        this.porteEvento          = evento.getPorteEvento();
        this.descricao            = evento.getDescricao();
        this.data                 = evento.getData();
        this.inicio               = evento.getInicio();
        this.termino              = evento.getTermino();
        this.nomeLocal            = evento.getNomeLocal();
        this.endereco             = evento.getEndereco();
        this.numero               = evento.getNumero();
        this.bairro               = evento.getBairro();
        this.tipoAmbiente         = evento.getTipoAmbiente();
        this.servicosSelecionados = evento.getServicosSelecionados();
        this.entregaSelecionada   = evento.getEntregaSelecionada();
        this.prazoEntrega         = evento.getPrazoEntrega();
        this.qtdFotos             = evento.getQtdFotos();
        this.status               = evento.getStatus();

        if (evento.getUsuario() != null) {
            this.nomeCliente = evento.getUsuario().getNome();
        }

        this.profissionais = escalas.stream()
                .filter(e -> e.getProfissional() != null)
                .map(e -> new ProfissionalEscalaDTO(
                        e.getId(),
                        e.getProfissional().getId(),
                        e.getProfissional().getNome(),
                        e.getProfissional().getTelefone(),
                        e.getStatus(),
                        e.getDiaSemana()
                ))
                .collect(Collectors.toList());
    }

   
    public static class ProfissionalEscalaDTO {
        private Long escalaId;
        private Long profissionalId;
        private String nome;
        private String telefone;
        private String statusEscala;
        private String diaSemana;

        public ProfissionalEscalaDTO(
                Long escalaId,
                Long profissionalId,
                String nome,
                String telefone,
                String statusEscala,
                String diaSemana
        ) {
            this.escalaId       = escalaId;
            this.profissionalId = profissionalId;
            this.nome           = nome;
            this.telefone       = telefone;
            this.statusEscala   = statusEscala;
            this.diaSemana      = diaSemana;
        }

        public Long getEscalaId()       { return escalaId; }
        public Long getProfissionalId() { return profissionalId; }
        public String getNome()         { return nome; }
        public String getTelefone()     { return telefone; }
        public String getStatusEscala() { return statusEscala; }
        public String getDiaSemana()    { return diaSemana; }
    }

   
    public Long getId()                    { return id; }
    public String getNomeEvento()          { return nomeEvento; }
    public String getTipoEvento()          { return tipoEvento; }
    public String getPorteEvento()         { return porteEvento; }
    public String getDescricao()           { return descricao; }
    public String getData()                { return data; }
    public String getInicio()              { return inicio; }
    public String getTermino()             { return termino; }
    public String getNomeLocal()           { return nomeLocal; }
    public String getEndereco()            { return endereco; }
    public String getNumero()              { return numero; }
    public String getBairro()              { return bairro; }
    public String getTipoAmbiente()        { return tipoAmbiente; }
    public String getServicosSelecionados(){ return servicosSelecionados; }
    public String getEntregaSelecionada()  { return entregaSelecionada; }
    public String getPrazoEntrega()        { return prazoEntrega; }
    public String getQtdFotos()            { return qtdFotos; }
    public String getStatus()              { return status; }
    public String getNomeCliente()         { return nomeCliente; }
    public List<ProfissionalEscalaDTO> getProfissionais() { return profissionais; }
}