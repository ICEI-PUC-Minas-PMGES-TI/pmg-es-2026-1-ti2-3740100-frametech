package com.example.back.services;

import com.example.back.dto.EventoEquipamentoDTO;
import com.example.back.model.Equipamento;
import com.example.back.model.Evento;
import com.example.back.model.EventoEquipamento;
import com.example.back.repository.EquipamentoRepository;
import com.example.back.repository.EventoEquipamentoRepository;
import com.example.back.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipamentoService {

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoEquipamentoRepository eventoEquipamentoRepository;

    public Equipamento salvar(Equipamento equipamento) {
        if (equipamento.getStatus() == null || equipamento.getStatus().isBlank()) {
            equipamento.setStatus("DISPONIVEL");
        }

        return equipamentoRepository.save(equipamento);
    }

    public List<Equipamento> listarTodos() {
        atualizarDisponibilidade();
        return equipamentoRepository.findAll();
    }

    public Equipamento atualizar(Long id, Equipamento dados) {
        Equipamento equipamento = equipamentoRepository.findById(id).orElseThrow();

        equipamento.setNome(dados.getNome());
        equipamento.setTipo(dados.getTipo());
        equipamento.setPatrimonio(dados.getPatrimonio());
        equipamento.setDescricao(dados.getDescricao());

        if (dados.getStatus() != null && !dados.getStatus().isBlank()) {
            equipamento.setStatus(dados.getStatus());
        }

        return equipamentoRepository.save(equipamento);
    }

    public void excluir(Long id) {
        equipamentoRepository.deleteById(id);
    }

    public EventoEquipamentoDTO associar(Long eventoId, Long equipamentoId) {
        Evento evento = eventoRepository.findById(eventoId).orElseThrow();
        Equipamento equipamento = equipamentoRepository.findById(equipamentoId).orElseThrow();

        if (eventoEquipamentoRepository
                .findByEvento_IdAndEquipamento_Id(eventoId, equipamentoId)
                .isPresent()) {
            throw new RuntimeException("Este equipamento ja esta associado a este evento.");
        }

        if (temConflitoDeAgenda(equipamentoId, evento)) {
            throw new RuntimeException("Equipamento indisponivel neste horario.");
        }

        EventoEquipamento eventoEquipamento = new EventoEquipamento();
        eventoEquipamento.setEvento(evento);
        eventoEquipamento.setEquipamento(equipamento);

        equipamento.setStatus("OCUPADO");
        equipamentoRepository.save(equipamento);

        return new EventoEquipamentoDTO(eventoEquipamentoRepository.save(eventoEquipamento));
    }

    public List<EventoEquipamentoDTO> listarAssociacoes() {
        return eventoEquipamentoRepository
                .findAll()
                .stream()
                .map(EventoEquipamentoDTO::new)
                .toList();
    }

    public List<EventoEquipamentoDTO> listarPorEvento(Long eventoId) {
        return eventoEquipamentoRepository
                .findByEvento_Id(eventoId)
                .stream()
                .map(EventoEquipamentoDTO::new)
                .toList();
    }

    public void removerAssociacao(Long associacaoId) {
        EventoEquipamento associacao = eventoEquipamentoRepository
                .findById(associacaoId)
                .orElseThrow();

        Equipamento equipamento = associacao.getEquipamento();

        eventoEquipamentoRepository.delete(associacao);

        if (eventoEquipamentoRepository.findByEquipamento_Id(equipamento.getId()).isEmpty()) {
            equipamento.setStatus("DISPONIVEL");
            equipamentoRepository.save(equipamento);
        }
    }

    private boolean temConflitoDeAgenda(Long equipamentoId, Evento novoEvento) {
        List<EventoEquipamento> associacoes =
                eventoEquipamentoRepository.findByEquipamento_Id(equipamentoId);

        for (EventoEquipamento associacao : associacoes) {
            Evento eventoExistente = associacao.getEvento();

            if (mesmaData(eventoExistente, novoEvento)
                    && horariosConflitam(eventoExistente, novoEvento)) {
                return true;
            }
        }

        return false;
    }

    private boolean mesmaData(Evento eventoExistente, Evento novoEvento) {
        return eventoExistente.getData() != null
                && eventoExistente.getData().equals(novoEvento.getData());
    }

    private boolean horariosConflitam(Evento eventoExistente, Evento novoEvento) {
        String inicioExistente = eventoExistente.getInicio();
        String terminoExistente = eventoExistente.getTermino();
        String novoInicio = novoEvento.getInicio();
        String novoTermino = novoEvento.getTermino();

        if (inicioExistente == null || terminoExistente == null
                || novoInicio == null || novoTermino == null) {
            return true;
        }

        return novoInicio.compareTo(terminoExistente) < 0
                && novoTermino.compareTo(inicioExistente) > 0;
    }

    private void atualizarDisponibilidade() {
        List<Equipamento> equipamentos = equipamentoRepository.findAll();

        for (Equipamento equipamento : equipamentos) {
            if (eventoEquipamentoRepository.findByEquipamento_Id(equipamento.getId()).isEmpty()) {
                equipamento.setStatus("DISPONIVEL");
                equipamentoRepository.save(equipamento);
            }
        }
    }
}
