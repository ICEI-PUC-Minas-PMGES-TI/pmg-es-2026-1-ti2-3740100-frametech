package com.example.back.dto;

public class IndicadorEventosConcluidosDTO {

    private long confirmados;
    private long concluidos;
    private long pendentesConclusao;
    private double percentual;

    public IndicadorEventosConcluidosDTO(long confirmados, long concluidos, long pendentesConclusao, double percentual) {
        this.confirmados = confirmados;
        this.concluidos = concluidos;
        this.pendentesConclusao = pendentesConclusao;
        this.percentual = percentual;
    }

    public long getConfirmados() {
        return confirmados;
    }

    public void setConfirmados(long confirmados) {
        this.confirmados = confirmados;
    }

    public long getConcluidos() {
        return concluidos;
    }

    public void setConcluidos(long concluidos) {
        this.concluidos = concluidos;
    }

    public long getPendentesConclusao() {
        return pendentesConclusao;
    }

    public void setPendentesConclusao(long pendentesConclusao) {
        this.pendentesConclusao = pendentesConclusao;
    }

    public double getPercentual() {
        return percentual;
    }

    public void setPercentual(double percentual) {
        this.percentual = percentual;
    }
}
