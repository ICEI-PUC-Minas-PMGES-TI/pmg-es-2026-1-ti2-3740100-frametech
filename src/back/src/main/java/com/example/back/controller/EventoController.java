package com.example.back.controller;

import com.example.back.model.Evento;
import com.example.back.services.EventoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService service;

    @PostMapping("/{usuarioId}")
    public ResponseEntity<?> criarEvento(
            @RequestBody Evento evento,
            @PathVariable Long usuarioId
    ) {
        try {
            return ResponseEntity.ok(service.salvar(evento, usuarioId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Evento> listarEventos(
            @PathVariable Long usuarioId
    ) {

        return service.listarPorUsuario(usuarioId);
    }

    @GetMapping
    public List<Evento> listarTodos() {

        return service.listarTodos();
    }

    @PutMapping("/{id}/status")
    public Evento atualizarStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return service.atualizarStatus(id, status);
    }
}
