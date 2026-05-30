package com.example.back.dto;

import com.example.back.model.EventoEquipamento;

public class EventoEquipamentoDTO {

    private Long id;
    private Long eventoId;
    private String nomeEvento;
    private String data;
    private String inicio;
    private String termino;
    private Long equipamentoId;
    private String nomeEquipamento;
    private String tipoEquipamento;
    private String statusEquipamento;

    public EventoEquipamentoDTO(EventoEquipamento eventoEquipamento) {
        this.id = eventoEquipamento.getId();
        this.eventoId = eventoEquipamento.getEvento().getId();
        this.nomeEvento = eventoEquipamento.getEvento().getNomeEvento();
        this.data = eventoEquipamento.getEvento().getData();
        this.inicio = eventoEquipamento.getEvento().getInicio();
        this.termino = eventoEquipamento.getEvento().getTermino();
        this.equipamentoId = eventoEquipamento.getEquipamento().getId();
        this.nomeEquipamento = eventoEquipamento.getEquipamento().getNome();
        this.tipoEquipamento = eventoEquipamento.getEquipamento().getTipo();
        this.statusEquipamento = eventoEquipamento.getEquipamento().getStatus();
    }

    public Long getId() { return id; }
    public Long getEventoId() { return eventoId; }
    public String getNomeEvento() { return nomeEvento; }
    public String getData() { return data; }
    public String getInicio() { return inicio; }
    public String getTermino() { return termino; }
    public Long getEquipamentoId() { return equipamentoId; }
    public String getNomeEquipamento() { return nomeEquipamento; }
    public String getTipoEquipamento() { return tipoEquipamento; }
    public String getStatusEquipamento() { return statusEquipamento; }
}
