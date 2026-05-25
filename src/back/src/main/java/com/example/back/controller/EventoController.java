package com.example.back.controller;

import com.example.back.model.Evento;
import com.example.back.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoRepository repository;

    // LISTAR TODOS
    @GetMapping
    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    // CRIAR EVENTO
    @PostMapping
    public Evento criarEvento(@RequestBody Evento evento) {
        return repository.save(evento);
    }

    // ATUALIZAR STATUS
    @PutMapping("/{id}/status")
    public Evento atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Evento evento = repository.findById(id).orElseThrow();
        evento.setStatus(body.get("status"));
        return repository.save(evento);
    }
}