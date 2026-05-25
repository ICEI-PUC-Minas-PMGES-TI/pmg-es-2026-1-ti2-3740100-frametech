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
    private String descricao;
    private String dataEvento;
    private String status = "CRIADO";
    private Double orcamento;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Evento() {}

    // Getters e Setters conforme sua estrutura original
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomeEvento() { return nomeEvento; }
    public void setNomeEvento(String nomeEvento) { this.nomeEvento = nomeEvento; }
    public String getTipoEvento() { return tipoEvento; }
    public void setTipoEvento(String tipoEvento) { this.tipoEvento = tipoEvento; }
    public String getPorteEvento() { return porteEvento; }
    public void setPorteEvento(String porteEvento) { this.porteEvento = porteEvento; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getDataEvento() { return dataEvento; }
    public void setDataEvento(String dataEvento) { this.dataEvento = dataEvento; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getOrcamento() { return orcamento; }
    public void setOrcamento(Double orcamento) { this.orcamento = orcamento; }
}