package com.example.back.controller;

import com.example.back.dto.AssociarEquipamentoDTO;
import com.example.back.dto.EventoEquipamentoDTO;
import com.example.back.model.Equipamento;
import com.example.back.services.EquipamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamentos")
@CrossOrigin(origins = "*")
public class EquipamentoController {

    @Autowired
    private EquipamentoService equipamentoService;

    @PostMapping
    public Equipamento cadastrar(@RequestBody Equipamento equipamento) {
        return equipamentoService.salvar(equipamento);
    }

    @GetMapping
    public List<Equipamento> listarTodos() {
        return equipamentoService.listarTodos();
    }

    @PutMapping("/{id}")
    public Equipamento atualizar(@PathVariable Long id, @RequestBody Equipamento equipamento) {
        return equipamentoService.atualizar(id, equipamento);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        equipamentoService.excluir(id);
    }

    @PostMapping("/associar")
    public ResponseEntity<?> associar(@RequestBody AssociarEquipamentoDTO dto) {
        try {
            return ResponseEntity.ok(
                    equipamentoService.associar(dto.getEventoId(), dto.getEquipamentoId())
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/associacoes")
    public List<EventoEquipamentoDTO> listarAssociacoes() {
        return equipamentoService.listarAssociacoes();
    }

    @GetMapping("/evento/{eventoId}")
    public List<EventoEquipamentoDTO> listarPorEvento(@PathVariable Long eventoId) {
        return equipamentoService.listarPorEvento(eventoId);
    }

    @DeleteMapping("/associacoes/{id}")
    public void removerAssociacao(@PathVariable Long id) {
        equipamentoService.removerAssociacao(id);
    }
}
