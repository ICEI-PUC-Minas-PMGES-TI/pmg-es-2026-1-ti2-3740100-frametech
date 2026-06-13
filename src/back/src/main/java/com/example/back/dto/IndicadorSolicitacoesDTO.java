package com.example.back.dto;

public class IndicadorSolicitacoesDTO {
    private long total;
    private long atendidas;
    private long pendentes;
    private double percentual;

    public IndicadorSolicitacoesDTO(long total, long atendidas, long pendentes, double percentual) {
        this.total = total;
        this.atendidas = atendidas;
        this.pendentes = pendentes;
        this.percentual = percentual;
    }

    public long getTotal() { return total; }
    public long getAtendidas() { return atendidas; }
    public long getPendentes() { return pendentes; }
    public double getPercentual() { return percentual; }
}