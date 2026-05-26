package com.example.back.dto;

import com.example.back.model.Escala;
import com.example.back.model.Evento;
import com.example.back.model.Usuario;

public class EscalaDTO {

    private Long id;
    private String status;

    private Long eventoId;
    private String nomeEvento;
    private String tipoEvento;
    private String porteEvento;
    private String descricao;
    private String dataEvento;

    private Long clienteId;
    private String nomeCliente;

    private Long profissionalId;
    private String nomeProfissional;

    public EscalaDTO(Escala escala) {
        this.id = escala.getId();
        this.status = escala.getStatus();

        Evento evento = escala.getEvento();

        if (evento != null) {
            this.eventoId = evento.getId();
            this.nomeEvento = evento.getNomeEvento();
            this.tipoEvento = evento.getTipoEvento();
            this.porteEvento = evento.getNomeEvento();
            this.descricao = evento.getDescricao();
            this.dataEvento = evento.getData();

            Usuario cliente = evento.getUsuario();

            if (cliente != null) {
                this.clienteId = cliente.getId();
                this.nomeCliente = cliente.getNome();
            }
        }

        Usuario profissional = escala.getProfissional();

        if (profissional != null) {
            this.profissionalId = profissional.getId();
            this.nomeProfissional = profissional.getNome();
        }
    }

    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public Long getEventoId() {
        return eventoId;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public String getPorteEvento() {
        return porteEvento;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getDataEvento() {
        return dataEvento;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public Long getProfissionalId() {
        return profissionalId;
    }

    public String getNomeProfissional() {
        return nomeProfissional;
    }
}
