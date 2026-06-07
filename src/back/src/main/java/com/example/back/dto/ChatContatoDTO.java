package com.example.back.dto;

public class ChatContatoDTO {

    private Long eventoId;
    private String nomeEvento;
    private String nomeLocal;
    private Long usuarioId;
    private String nomeUsuario;
    private String tipoUsuario;
    private String descricao;

    public ChatContatoDTO() {
    }

    public ChatContatoDTO(
            Long eventoId,
            String nomeEvento,
            String nomeLocal,
            Long usuarioId,
            String nomeUsuario,
            String tipoUsuario,
            String descricao
    ) {
        this.eventoId = eventoId;
        this.nomeEvento = nomeEvento;
        this.nomeLocal = nomeLocal;
        this.usuarioId = usuarioId;
        this.nomeUsuario = nomeUsuario;
        this.tipoUsuario = tipoUsuario;
        this.descricao = descricao;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public void setEventoId(Long eventoId) {
        this.eventoId = eventoId;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public String getNomeLocal() {
        return nomeLocal;
    }

    public void setNomeLocal(String nomeLocal) {
        this.nomeLocal = nomeLocal;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
