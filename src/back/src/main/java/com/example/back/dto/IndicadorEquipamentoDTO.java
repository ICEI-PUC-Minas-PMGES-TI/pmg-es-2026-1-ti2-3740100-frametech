package com.example.back.dto;

public class IndicadorEquipamentoDTO {

    private String categoria;
    private Long totalCategoria;
    private Long alocadosCategoria;
    private Double percentual;

    public IndicadorEquipamentoDTO(
            String categoria,
            Long totalCategoria,
            Long alocadosCategoria,
            Double percentual
    ) {
        this.categoria = categoria;
        this.totalCategoria = totalCategoria;
        this.alocadosCategoria = alocadosCategoria;
        this.percentual = percentual;
    }

    public String getCategoria() {
        return categoria;
    }

    public Long getTotalCategoria() {
        return totalCategoria;
    }

    public Long getAlocadosCategoria() {
        return alocadosCategoria;
    }

    public Double getPercentual() {
        return percentual;
    }
}