package com.example.back.dto;

public class TrocarProfissionalRequestDTO {

    private Long novoProfissionalId;
    private Long admId;

    public Long getNovoProfissionalId() { return novoProfissionalId; }
    public void setNovoProfissionalId(Long novoProfissionalId) {
        this.novoProfissionalId = novoProfissionalId;
    }

    public Long getAdmId() { return admId; }
    public void setAdmId(Long admId) { this.admId = admId; }
}