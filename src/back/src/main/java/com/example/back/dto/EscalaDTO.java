package com.example.back.dto;

import com.example.back.model.Escala;

public class EscalaDTO {

    private Long id;

    private String nomeEvento;

    private String nomeProfissional;

    private String diaSemana;

    private String status;

    public EscalaDTO(Escala escala) {

        this.id = escala.getId();

        this.nomeEvento =
                escala.getEvento().getNomeEvento();

        this.nomeProfissional =
                escala.getProfissional().getNome();

        this.diaSemana =
                escala.getDiaSemana();

        this.status =
                escala.getStatus();
    }

    public Long getId() {
        return id;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public String getNomeProfissional() {
        return nomeProfissional;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public String getStatus() {
        return status;
    }
}