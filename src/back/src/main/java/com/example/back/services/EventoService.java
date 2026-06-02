package com.example.back.services;

import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Arrays;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Evento salvar(
            Evento evento,
            Long usuarioId
    ) {

        validarTipoEvento(evento.getTipoEvento());
        validarHorarioEvento(evento);
        validarDataEvento(evento.getData());
        validarNumeroEndereco(evento.getNumero());

        Usuario usuario = usuarioRepository
                .findById(usuarioId)
                .orElseThrow();

        evento.setUsuario(usuario);

        evento.setStatus("EM_ANALISE");

        return eventoRepository.save(evento);
    }

    public List<Evento> listarPorUsuario(
            Long usuarioId
    ) {

        return eventoRepository
                .findByUsuario_Id(usuarioId);
    }

    public List<Evento> listarTodos() {

        return eventoRepository.findAll();
    }

    private void validarTipoEvento(String tipoEvento) {
        List<String> tiposPermitidos = Arrays.asList(
                "CASAMENTO",
                "FORMATURA",
                "ANIVERSARIO",
                "EMPRESARIAL",
                "SHOW",
                "ENSAIO",
                "OUTRO"
        );

        if (tipoEvento == null || tipoEvento.isBlank()) {
            throw new RuntimeException("Tipo de evento obrigatorio.");
        }

        String tipoFormatado = tipoEvento
                .trim()
                .toUpperCase()
                .replace("Á", "A")
                .replace("Ã", "A")
                .replace("Â", "A")
                .replace("Í", "I")
                .replace("Ç", "C");

        if (!tiposPermitidos.contains(tipoFormatado)) {
            throw new RuntimeException(
                    "Tipo de evento invalido. Use: Casamento, Formatura, Aniversario, Empresarial, Show, Ensaio ou Outro."
            );
        }
    }

    private void validarHorarioEvento(Evento evento) {
        if (evento.getInicio() == null || evento.getTermino() == null) {
            throw new RuntimeException("Horario do evento obrigatorio.");
        }

        if (evento.getInicio().compareTo(evento.getTermino()) >= 0) {
            throw new RuntimeException("O horario de inicio deve ser menor que o horario de termino.");
        }
    }

    private void validarDataEvento(String data) {
        if (data == null || data.isBlank()) {
            throw new RuntimeException("A data do evento e obrigatoria.");
        }

        LocalDate dataEvento = LocalDate.parse(data);
        LocalDate hoje = LocalDate.now();

        if (!dataEvento.isAfter(hoje)) {
            throw new RuntimeException("A data do evento deve ser uma data futura.");
        }
    }

    private void validarNumeroEndereco(String numero) {
        if (numero == null || numero.isBlank()) {
            return;
        }

        if (!numero.matches("\\d+")) {
            throw new RuntimeException("O numero do endereco deve conter apenas digitos.");
        }
    }

    public Evento atualizarStatus(
            Long id,
            String status
    ) {

        Evento evento = eventoRepository
                .findById(id)
                .orElseThrow();

        evento.setStatus(status);

        return eventoRepository.save(evento);
    }
}
