package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeEvento;
    private String tipoEvento;
    private String porteEvento;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String data;
    private String inicio;
    private String termino;

    private String nomeLocal;
    private String endereco;
    private String numero;
    private String bairro;

    private String tipoAmbiente;

    @Column(columnDefinition = "TEXT")
    private String servicosSelecionados;

    @Column(columnDefinition = "TEXT")
    private String entregaSelecionada;

    private String prazoEntrega;
    private String qtdFotos;

    @Column(columnDefinition = "TEXT")
    private String referencias;

    private String trabalhouAntes;

    @Column(columnDefinition = "TEXT")
    private String anexoReferencias;

    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Evento() {
    }

    public Long getId() {
        return id;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getPorteEvento() {
        return porteEvento;
    }

    public void setPorteEvento(String porteEvento) {
        this.porteEvento = porteEvento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getInicio() {
        return inicio;
    }

    public void setInicio(String inicio) {
        this.inicio = inicio;
    }

    public String getTermino() {
        return termino;
    }

    public void setTermino(String termino) {
        this.termino = termino;
    }

    public String getNomeLocal() {
        return nomeLocal;
    }

    public void setNomeLocal(String nomeLocal) {
        this.nomeLocal = nomeLocal;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getTipoAmbiente() {
        return tipoAmbiente;
    }

    public void setTipoAmbiente(String tipoAmbiente) {
        this.tipoAmbiente = tipoAmbiente;
    }

    public String getServicosSelecionados() {
        return servicosSelecionados;
    }

    public void setServicosSelecionados(String servicosSelecionados) {
        this.servicosSelecionados = servicosSelecionados;
    }

    public String getEntregaSelecionada() {
        return entregaSelecionada;
    }

    public void setEntregaSelecionada(String entregaSelecionada) {
        this.entregaSelecionada = entregaSelecionada;
    }

    public String getPrazoEntrega() {
        return prazoEntrega;
    }

    public void setPrazoEntrega(String prazoEntrega) {
        this.prazoEntrega = prazoEntrega;
    }

    public String getQtdFotos() {
        return qtdFotos;
    }

    public void setQtdFotos(String qtdFotos) {
        this.qtdFotos = qtdFotos;
    }

    public String getReferencias() {
        return referencias;
    }

    public void setReferencias(String referencias) {
        this.referencias = referencias;
    }

    public String getTrabalhouAntes() {
        return trabalhouAntes;
    }

    public void setTrabalhouAntes(String trabalhouAntes) {
        this.trabalhouAntes = trabalhouAntes;
    }

    public String getAnexoReferencias() {
        return anexoReferencias;
    }

    public void setAnexoReferencias(String anexoReferencias) {
        this.anexoReferencias = anexoReferencias;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}