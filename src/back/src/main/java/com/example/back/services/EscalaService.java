package com.example.back.services;

import com.example.back.dto.EscalaDTO;
import com.example.back.dto.EventoDetalheDTO;
import com.example.back.model.Escala;
import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EscalaRepository;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EscalaService {

    @Autowired
    private EscalaRepository escalaRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<EscalaDTO> listarPorProfissional(Long profissionalId) {
        return escalaRepository
                .findByProfissional_Id(profissionalId)
                .stream()
                .map(EscalaDTO::new)
                .toList();
    }

    public List<EscalaDTO> listarPorEvento(Long eventoId) {
        return escalaRepository
                .findByEvento_Id(eventoId)
                .stream()
                .map(EscalaDTO::new)
                .toList();
    }

    public EventoDetalheDTO detalharEvento(Long eventoId) {
        Evento evento = eventoRepository
                .findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado: " + eventoId));

        List<Escala> escalas = escalaRepository.findByEvento_Id(eventoId);

        return new EventoDetalheDTO(evento, escalas);
    }

    
    public EscalaDTO aceitar(Long escalaId) {
        Escala escala = escalaRepository
                .findById(escalaId)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada: " + escalaId));

        escala.setStatus("ACEITA");
        return new EscalaDTO(escalaRepository.save(escala));
    }

    
    public EscalaDTO recusar(Long escalaId) {
        Escala escala = escalaRepository
                .findById(escalaId)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada: " + escalaId));

        escala.setStatus("RECUSADA");
        return new EscalaDTO(escalaRepository.save(escala));
    }

    
    @Transactional
    public void removerProfissionalDaEscala(Long escalaId) {
        Escala escala = escalaRepository
                .findById(escalaId)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada: " + escalaId));

        escalaRepository.delete(escala);
    }

  
    @Transactional
    public EscalaDTO trocarProfissional(Long escalaId, Long novoProfissionalId, Long admId) {
        Escala escalaAntiga = escalaRepository
                .findById(escalaId)
                .orElseThrow(() -> new RuntimeException("Escala não encontrada: " + escalaId));

        Evento evento = escalaAntiga.getEvento();
        String diaSemana = escalaAntiga.getDiaSemana();

        
        boolean jaEscalado = escalaRepository
                .findByEvento_IdAndProfissional_Id(evento.getId(), novoProfissionalId)
                .isPresent();

        if (jaEscalado) {
            throw new RuntimeException("Profissional já está escalado para este evento.");
        }

        Usuario novoProfissional = usuarioRepository
                .findById(novoProfissionalId)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado: " + novoProfissionalId));

        Usuario adm = usuarioRepository
                .findById(admId)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado: " + admId));

       
        escalaRepository.delete(escalaAntiga);

        
        Escala novaEscala = new Escala();
        novaEscala.setEvento(evento);
        novaEscala.setProfissional(novoProfissional);
        novaEscala.setAdm(adm);
        novaEscala.setDiaSemana(diaSemana);
        novaEscala.setStatus("PENDENTE");

        return new EscalaDTO(escalaRepository.save(novaEscala));
    }

   
    @Transactional
    public EscalaDTO adicionarProfissionalAoEvento(Long eventoId, Long profissionalId, Long admId, String diaSemana) {
     
        boolean jaEscalado = escalaRepository
                .findByEvento_IdAndProfissional_Id(eventoId, profissionalId)
                .isPresent();

        if (jaEscalado) {
            throw new RuntimeException("Profissional já está escalado para este evento.");
        }

        Evento evento = eventoRepository
                .findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado: " + eventoId));

        Usuario profissional = usuarioRepository
                .findById(profissionalId)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado: " + profissionalId));

        Usuario adm = usuarioRepository
                .findById(admId)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado: " + admId));

        Escala escala = new Escala();
        escala.setEvento(evento);
        escala.setProfissional(profissional);
        escala.setAdm(adm);
        escala.setDiaSemana(diaSemana != null ? diaSemana : "");
        escala.setStatus("PENDENTE");

        return new EscalaDTO(escalaRepository.save(escala));
    }
}