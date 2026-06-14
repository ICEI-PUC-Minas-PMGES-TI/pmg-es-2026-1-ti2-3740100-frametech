package com.example.back.dto;

public class IndicadorPagamentosDTO {
    private long total;
    private long aprovados;
    private long pendentes;
    private long recusados;
    private double percentual;

    public IndicadorPagamentosDTO(long total, long aprovados, long pendentes, long recusados, double percentual) {
        this.total = total;
        this.aprovados = aprovados;
        this.pendentes = pendentes;
        this.recusados = recusados;
        this.percentual = percentual;
    }

    public long getTotal() { return total; }
    public long getAprovados() { return aprovados; }
    public long getPendentes() { return pendentes; }
    public long getRecusados() { return recusados; }
    public double getPercentual() { return percentual; }
}
