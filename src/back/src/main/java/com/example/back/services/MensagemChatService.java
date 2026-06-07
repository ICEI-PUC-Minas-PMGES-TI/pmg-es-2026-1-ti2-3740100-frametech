package com.example.back.services;

import com.example.back.dto.ChatContatoDTO;
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

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    public List<ChatContatoDTO> listarContatosDisponiveis(Long usuarioId) {

        Usuario usuario =
                usuarioRepository.findById(usuarioId)
                        .orElseThrow();

        String tipo = usuario.getTipo() == null
                ? ""
                : usuario.getTipo().toLowerCase();

        Map<String, ChatContatoDTO> contatos =
                new LinkedHashMap<>();

        if (
                tipo.equals("adm")
                || tipo.equals("admin")
                || tipo.equals("empresa")
        ) {
            montarContatosAdm(usuarioId, contatos);
        } else if (tipo.equals("cliente")) {
            montarContatosCliente(usuarioId, contatos);
        } else {
            montarContatosProfissional(usuarioId, contatos);
        }

        return new ArrayList<>(contatos.values());
    }

    private void montarContatosAdm(
            Long usuarioId,
            Map<String, ChatContatoDTO> contatos
    ) {

        List<Evento> eventos =
                eventoRepository.findAll();

        for (Evento evento : eventos) {

            if (evento == null) {
                continue;
            }

            Usuario cliente = evento.getUsuario();

            if (
                    cliente != null
                    && !cliente.getId().equals(usuarioId)
            ) {
                adicionarContato(
                        contatos,
                        evento,
                        cliente,
                        "Cliente cadastrado"
                );
            }

            List<Escala> escalas =
                    escalaRepository.findByEvento_Id(
                            evento.getId()
                    );

            for (Escala escala : escalas) {

                Usuario profissional =
                        escala.getProfissional();

                if (
                        profissional != null
                        && !profissional.getId().equals(usuarioId)
                ) {
                    adicionarContato(
                            contatos,
                            evento,
                            profissional,
                            "Profissional cadastrado"
                    );
                }
            }
        }
    }

    private void montarContatosCliente(
            Long usuarioId,
            Map<String, ChatContatoDTO> contatos
    ) {

        List<Evento> eventos =
                eventoRepository.findByUsuario_Id(
                        usuarioId
                );

        for (Evento evento : eventos) {

            if (evento == null) {
                continue;
            }

            List<Escala> escalas =
                    escalaRepository.findByEvento_Id(
                            evento.getId()
                    );

            boolean admAdicionado = false;

            for (Escala escala : escalas) {

                Usuario profissional =
                        escala.getProfissional();

                if (
                        profissional != null
                        && escalaAceita(escala)
                ) {
                    adicionarContato(
                            contatos,
                            evento,
                            profissional,
                            "Profissional do evento"
                    );
                }

                Usuario adm = escala.getAdm();

                if (
                        !admAdicionado
                        && adm != null
                ) {
                    adicionarContato(
                            contatos,
                            evento,
                            adm,
                            "Administrador responsável"
                    );

                    admAdicionado = true;
                }
            }
        }
    }

    private void montarContatosProfissional(
            Long usuarioId,
            Map<String, ChatContatoDTO> contatos
    ) {

        List<Escala> minhasEscalas =
                escalaRepository
                        .findByProfissional_IdAndStatus(
                                usuarioId,
                                "ACEITA"
                        );

        for (Escala minhaEscala : minhasEscalas) {

            Evento evento = minhaEscala.getEvento();

            if (evento == null) {
                continue;
            }

            Usuario cliente = evento.getUsuario();

            if (cliente != null) {
                adicionarContato(
                        contatos,
                        evento,
                        cliente,
                        "Cliente do evento"
                );
            }

            Usuario adm = minhaEscala.getAdm();

            if (adm != null) {
                adicionarContato(
                        contatos,
                        evento,
                        adm,
                        "Administrador responsável"
                );
            }

            List<Escala> escalasDoEvento =
                    escalaRepository.findByEvento_Id(
                            evento.getId()
                    );

            for (Escala escala : escalasDoEvento) {

                Usuario profissional =
                        escala.getProfissional();

                if (
                        profissional != null
                        && !profissional.getId().equals(usuarioId)
                        && escalaAceita(escala)
                ) {
                    adicionarContato(
                            contatos,
                            evento,
                            profissional,
                            "Profissional do evento"
                    );
                }
            }
        }
    }

    private boolean escalaAceita(Escala escala) {

        return escala.getStatus() != null
                && escala.getStatus().equals("ACEITA");
    }

    private void adicionarContato(
            Map<String, ChatContatoDTO> contatos,
            Evento evento,
            Usuario usuario,
            String descricao
    ) {

        String chave =
                evento.getId()
                + "-"
                + usuario.getId()
                + "-"
                + descricao;

        contatos.putIfAbsent(
                chave,
                new ChatContatoDTO(
                        evento.getId(),
                        evento.getNomeEvento(),
                        evento.getNomeLocal(),
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getTipo(),
                        descricao
                )
        );
    }
}
