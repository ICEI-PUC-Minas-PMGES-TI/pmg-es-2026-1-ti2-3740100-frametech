package com.example.back.services;

import com.example.back.model.Escala;
import com.example.back.model.Evento;
import com.example.back.model.MensagemChat;
import com.example.back.model.Usuario;

import com.example.back.repository.EscalaRepository;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.MensagemChatRepository;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensagemChatService {

    @Autowired
    private MensagemChatRepository repository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EscalaRepository escalaRepository;

    public MensagemChat enviar(
            Long usuarioId,
            Long eventoId,
            String mensagem
    ) {

        Usuario usuario =
                usuarioRepository.findById(usuarioId)
                        .orElseThrow();

        Evento evento =
                eventoRepository.findById(eventoId)
                        .orElseThrow();

        MensagemChat chat =
                new MensagemChat();

        chat.setMensagem(mensagem);
        chat.setUsuario(usuario);
        chat.setEvento(evento);

        return repository.save(chat);
    }

    public List<MensagemChat>
    listarMensagens(Long eventoId) {

        return repository
                .findByEvento_IdOrderByIdAsc(
                        eventoId
                );
    }

    public List<Evento>
    listarEventosUsuario(Long usuarioId) {

        Usuario usuario =
                usuarioRepository.findById(usuarioId)
                        .orElseThrow();

        String tipo =
                usuario.getTipo().toLowerCase();

        if (
                tipo.equals("cliente")
        ) {

            return eventoRepository
                    .findByUsuario_Id(usuarioId);
        }

        if (
                tipo.equals("empresa")
                || tipo.equals("adm")
                || tipo.equals("admin")
        ) {

            return eventoRepository.findAll();
        }

        return escalaRepository
                .findByProfissional_IdAndStatus(
                        usuarioId,
                        "ACEITA"
                )
                .stream()
                .map(Escala::getEvento)
                .distinct()
                .toList();
    }
}