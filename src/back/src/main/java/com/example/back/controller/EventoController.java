package com.example.back.controller;

import com.example.back.model.Evento;
import com.example.back.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*") // Essencial para o front falar com o back
public class EventoController {

    @Autowired
    private EventoRepository repository;

    @GetMapping
    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    @PutMapping("/{id}/status")
    public Evento atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Evento evento = repository.findById(id).orElseThrow();
        evento.setStatus(body.get("status"));
        return repository.save(evento);
    }
}
