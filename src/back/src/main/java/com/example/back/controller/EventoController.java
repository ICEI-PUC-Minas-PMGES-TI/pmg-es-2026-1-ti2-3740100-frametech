package com.example.back.controller;

import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/{usuarioId}")
    public Evento criarEvento(
            @PathVariable Long usuarioId,
            @RequestBody Evento evento
    ) {

        Usuario usuario =
                usuarioRepository.findById(usuarioId).orElse(null);

        evento.setUsuario(usuario);

        return eventoRepository.save(evento);
    }

    @GetMapping("/{usuarioId}")
    public List<Evento> listarEventos(
            @PathVariable Long usuarioId
    ) {

        return eventoRepository.findByUsuario_Id(usuarioId);
    }
}