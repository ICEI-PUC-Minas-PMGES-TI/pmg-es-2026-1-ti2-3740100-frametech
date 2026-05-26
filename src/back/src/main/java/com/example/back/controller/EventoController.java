package com.example.back.controller;

import com.example.back.model.Evento;
import com.example.back.services.EventoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService service;

    @PostMapping("/{usuarioId}")
    public Evento criarEvento(
            @RequestBody Evento evento,
            @PathVariable Long usuarioId
    ) {

        return service.salvar(evento, usuarioId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Evento> listarEventos(
            @PathVariable Long usuarioId
    ) {

        return service.listarPorUsuario(usuarioId);
    }
}