package com.example.back.services;

import com.example.back.dto.IndicadorSolicitacoesDTO;
import com.example.back.model.Evento;
import com.example.back.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventoService {

    @Autowired
    private EventoRepository repository;

    public Evento salvar(Evento evento, Long usuarioId) {
        evento.setUsuarioId(usuarioId);
        return repository.save(evento);
    }

    public List<Evento> listarPorUsuario(Long usuarioId) {
        return repository.findAll().stream()
                .filter(e -> e.getUsuario() != null &&
                        e.getUsuario().getId().equals(usuarioId))
                .collect(Collectors.toList());
    }

    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    public Evento atualizarStatus(Long id, String status) {
        Evento e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        e.setStatus(status);
        return repository.save(e);
    }

    public Evento atualizarOrcamento(Long id, Double valor) {
        Evento e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        e.setValorOrcamento(valor);
        return repository.save(e);
    }

    public IndicadorSolicitacoesDTO calcularTaxaSolicitacoesAtendidas() {

        List<Evento> eventos = repository.findAll();

        long total = eventos.size();

        long atendidas = eventos.stream()
                .filter(e -> {
                    if (e.getStatus() == null) {
                        return false;
                    }

                    String status = e.getStatus().trim().toUpperCase();

                    return status.equals("ACEITO");
                })
                .count();

        long pendentes = total - atendidas;

        double percentual = total == 0
                ? 0.0
                : ((double) atendidas / total) * 100.0;

        return new IndicadorSolicitacoesDTO(
                total,
                atendidas,
                pendentes,
                percentual
        );
    }
}