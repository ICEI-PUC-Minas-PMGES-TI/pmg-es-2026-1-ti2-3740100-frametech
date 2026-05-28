package com.example.back.dto;

import com.example.back.model.Escala;

public class EscalaDTO {

    private Long id;

    private String nomeEvento;
    private String nomeProfissional;
    private String diaSemana;
    private String status;

    private String dataEvento;
    private String inicio;
    private String termino;
    private String nomeLocal;
    private String nomeCliente;
    private String tipoEvento;
    private String porteEvento;
    private String descricao;

    public EscalaDTO(Escala escala) {

        this.id = escala.getId();
        this.status = escala.getStatus();
        this.diaSemana = escala.getDiaSemana();

        if (escala.getEvento() != null) {
            this.nomeEvento = escala.getEvento().getNomeEvento();
            this.dataEvento  = escala.getEvento().getData();
            this.inicio      = escala.getEvento().getInicio();
            this.termino     = escala.getEvento().getTermino();
            this.nomeLocal   = escala.getEvento().getNomeLocal();
            this.tipoEvento  = escala.getEvento().getTipoEvento();
            this.porteEvento = escala.getEvento().getPorteEvento();
            this.descricao   = escala.getEvento().getDescricao();

            if (escala.getEvento().getUsuario() != null) {
                this.nomeCliente = escala.getEvento().getUsuario().getNome();
            }
        }

        if (escala.getProfissional() != null) {
            this.nomeProfissional = escala.getProfissional().getNome();
        }
    }

    public Long getId() { return id; }

    public String getNomeEvento() { return nomeEvento; }

    public String getNomeProfissional() { return nomeProfissional; }

    public String getDiaSemana() { return diaSemana; }

    public String getStatus() { return status; }

    public String getDataEvento() { return dataEvento; }

    public String getInicio() { return inicio; }

    public String getTermino() { return termino; }

    public String getNomeLocal() { return nomeLocal; }

    public String getNomeCliente() { return nomeCliente; }

    public String getTipoEvento() { return tipoEvento; }

    public String getPorteEvento() { return porteEvento; }

    public String getDescricao() { return descricao; }
}