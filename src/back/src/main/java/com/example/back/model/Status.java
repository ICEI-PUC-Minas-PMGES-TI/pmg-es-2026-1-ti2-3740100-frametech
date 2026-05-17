package com.example.back.model;

public class Status {

    private Long id;
    private String nomeStatus;
    private String status;

    public Status() {
    }

    public Status(Long id, String nomeStatus, String status) {
        this.id = id;
        this.nomeStatus = nomeStatus;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeStatus() {
        return nomeStatus;
    }

    public void setNomeStatus(String nomeStatus) {
        this.nomeStatus = nomeStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}