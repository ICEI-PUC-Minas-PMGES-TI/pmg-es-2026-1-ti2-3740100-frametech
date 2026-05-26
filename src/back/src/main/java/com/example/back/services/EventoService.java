package com.example.back.services;

import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Evento salvar(Evento evento, Long usuarioId) {

        Usuario usuario = usuarioRepository
                .findById(usuarioId)
                .orElseThrow();

        evento.setUsuario(usuario);

        evento.setStatus("EM_ANALISE");

        return eventoRepository.save(evento);
    }

    public List<Evento> listarPorUsuario(Long usuarioId) {
        return eventoRepository.findByUsuario_Id(usuarioId);
    }
}