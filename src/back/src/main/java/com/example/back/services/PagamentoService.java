package com.example.back.services;

import com.example.back.dto.IndicadorPagamentosDTO;
import com.example.back.model.Evento;
import com.example.back.model.Pagamento;
import com.example.back.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagamentoService {

    private static final String STATUS_PENDENTE = "PENDENTE";
    private static final String STATUS_APROVADO = "APROVADO";
    private static final String STATUS_RECUSADO = "RECUSADO";

    @Autowired
    private PagamentoRepository repository;

    public Pagamento registrarPagamentoPendente(Evento evento) {
        return salvarPagamentoDoEvento(evento, STATUS_PENDENTE);
    }

    public Pagamento aprovarPagamento(Evento evento) {
        if (evento.getValorOrcamento() == null) {
            return null;
        }

        return salvarPagamentoDoEvento(evento, STATUS_APROVADO);
    }

    public Pagamento recusarPagamento(Evento evento) {
        if (evento.getValorOrcamento() == null) {
            return null;
        }

        return salvarPagamentoDoEvento(evento, STATUS_RECUSADO);
    }

    public IndicadorPagamentosDTO calcularPercentualAprovados() {
        long total = repository.count();
        long aprovados = repository.countByStatusIgnoreCase(STATUS_APROVADO);
        long pendentes = repository.countByStatusIgnoreCase(STATUS_PENDENTE);
        long recusados = repository.countByStatusIgnoreCase(STATUS_RECUSADO);

        double percentual = total == 0
                ? 0.0
                : ((double) aprovados / total) * 100.0;

        return new IndicadorPagamentosDTO(
                total,
                aprovados,
                pendentes,
                recusados,
                percentual
        );
    }

    private Pagamento salvarPagamentoDoEvento(Evento evento, String status) {
        Pagamento pagamento = repository.findByEvento_Id(evento.getId())
                .orElseGet(Pagamento::new);

        pagamento.setEvento(evento);
        pagamento.setValor(evento.getValorOrcamento());
        pagamento.setStatus(status);

        return repository.save(pagamento);
    }
}
