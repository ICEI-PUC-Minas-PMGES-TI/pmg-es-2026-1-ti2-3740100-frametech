package com.example.back.controller;

import com.example.back.dto.IndicadorSolicitacoesDTO;
import com.example.back.model.Evento;
import com.example.back.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService service;

    @PostMapping("/{usuarioId}")
    public ResponseEntity<?> criarEvento(@RequestBody Evento evento, @PathVariable Long usuarioId) {
        try {
            return ResponseEntity.ok(service.salvar(evento, usuarioId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Evento> listarEventos(@PathVariable Long usuarioId) {
        return service.listarPorUsuario(usuarioId);
    }

    @GetMapping
    public List<Evento> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/indicador-solicitacoes-atendidas")
    public IndicadorSolicitacoesDTO indicadorSolicitacoesAtendidas() {
        return service.calcularTaxaSolicitacoesAtendidas();
    }

    @PutMapping("/{id}/status")
    public Evento atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        return service.atualizarStatus(id, status);
    }

    @PutMapping("/{id}/orcamento")
    public Evento atualizarOrcamento(@PathVariable Long id, @RequestParam Double valor) {
        return service.atualizarOrcamento(id, valor);
    }
}
