package com.example.back.model;

import jakarta.persistence.*;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeEvento;
    private String tipoEvento;
    private String porteEvento;
    private String descricao;
    private String dataEvento;

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

    public String getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(String dataEvento) {
        this.dataEvento = dataEvento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}