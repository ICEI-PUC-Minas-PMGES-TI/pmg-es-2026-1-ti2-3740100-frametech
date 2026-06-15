package com.example.back.services;

import com.example.back.dto.IndicadorSolicitacoesDTO;
import com.example.back.dto.IndicadorEventosConcluidosDTO;
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

    @Autowired
    private PagamentoService pagamentoService;

    public Evento salvar(Evento evento, Long usuarioId) {
        evento.setUsuarioId(usuarioId);

        if (evento.getStatus() == null || evento.getStatus().trim().isEmpty()) {
            evento.setStatus("EM_ANALISE");
        }

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
        Evento eventoSalvo = repository.save(e);

        String statusNormalizado = status == null ? "" : status.trim().toUpperCase();

        if (statusNormalizado.equals("ACEITO")) {
            pagamentoService.aprovarPagamento(eventoSalvo);
        } else if (statusNormalizado.equals("RECUSADO")) {
            pagamentoService.recusarPagamento(eventoSalvo);
        }

        return eventoSalvo;
    }

    public Evento atualizarOrcamento(Long id, Double valor) {
        Evento e = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        e.setValorOrcamento(valor);
        e.setStatus("ORCAMENTO_ENVIADO");

        Evento eventoSalvo = repository.save(e);
        pagamentoService.registrarPagamentoPendente(eventoSalvo);

        return eventoSalvo;
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

    public IndicadorEventosConcluidosDTO calcularTaxaEventosConcluidosPelosConfirmados() {

        List<Evento> eventos = repository.findAll();

        long confirmados = eventos.stream()
                .filter(e -> {
                    if (e.getStatus() == null) {
                        return false;
                    }

                    String status = e.getStatus().trim().toUpperCase();

                    return status.equals("ACEITO") || status.equals("CONCLUIDO") || status.equals("CONCLUIDA");
                })
                .count();

        long concluidos = eventos.stream()
                .filter(e -> {
                    if (e.getStatus() == null) {
                        return false;
                    }

                    String status = e.getStatus().trim().toUpperCase();

                    return status.equals("CONCLUIDO") || status.equals("CONCLUIDA");
                })
                .count();

        long pendentesConclusao = confirmados - concluidos;

        double percentual = confirmados == 0
                ? 0.0
                : ((double) concluidos / confirmados) * 100.0;

        return new IndicadorEventosConcluidosDTO(
                confirmados,
                concluidos,
                pendentesConclusao,
                percentual
        );
    }

}
