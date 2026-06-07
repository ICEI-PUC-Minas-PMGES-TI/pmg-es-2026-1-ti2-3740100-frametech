package com.example.back.controller;

import com.example.back.dto.ChatContatoDTO;
import com.example.back.model.Evento;
import com.example.back.model.MensagemChat;
import com.example.back.services.MensagemChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*")
public class MensagemChatController {

    @Autowired
    private MensagemChatService service;

    @PostMapping("/enviar")
    public MensagemChat enviar(
            @RequestBody Map<String, String> body
    ) {

        return service.enviar(
                Long.parseLong(
                        body.get("usuarioId")
                ),
                Long.parseLong(
                        body.get("eventoId")
                ),
                body.get("mensagem")
        );
    }

    @GetMapping("/mensagens/{eventoId}")
    public List<MensagemChat> listar(
            @PathVariable Long eventoId
    ) {

        return service
                .listarMensagens(eventoId);
    }

    @GetMapping("/eventos/{usuarioId}")
    public List<Evento> listarEventos(
            @PathVariable Long usuarioId
    ) {

        return service
                .listarEventosUsuario(usuarioId);
    }

    @GetMapping("/contatos/{usuarioId}")
    public List<ChatContatoDTO> listarContatos(
            @PathVariable Long usuarioId
    ) {

        return service
                .listarContatosDisponiveis(usuarioId);
    }
}
