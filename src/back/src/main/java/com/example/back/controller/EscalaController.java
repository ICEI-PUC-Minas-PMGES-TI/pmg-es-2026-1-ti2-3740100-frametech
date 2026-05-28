package com.example.back.controller;

import com.example.back.dto.EscalaDTO;
import com.example.back.dto.EscalaRequestDTO;
import com.example.back.model.Escala;
import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EscalaRepository;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;
import com.example.back.services.EscalaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escalas")
@CrossOrigin(origins = "*")
public class EscalaController {

    @Autowired
    private EscalaRepository escalaRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EscalaService escalaService;

    @GetMapping("/aceitas")
    public List<EscalaDTO> listarEscalasAceitas() {
        return escalaRepository
                .findByStatus("ACEITA")
                .stream()
                .map(EscalaDTO::new)
                .toList();
    }

    @PostMapping
    public EscalaDTO criarEscala(@RequestBody EscalaRequestDTO dto) {

        Evento evento = eventoRepository
                .findById(dto.getEventoId())
                .orElse(null);

        Usuario profissional = usuarioRepository
                .findById(dto.getProfissionalId())
                .orElse(null);

        Usuario adm = usuarioRepository
                .findById(dto.getAdmId())
                .orElse(null);

        if (evento == null || profissional == null || adm == null) {
            return null;
        }

        Escala escala = new Escala();
        escala.setEvento(evento);
        escala.setProfissional(profissional);
        escala.setAdm(adm);
        escala.setDiaSemana(dto.getDiaSemana());
        escala.setStatus("PENDENTE");

        return new EscalaDTO(escalaRepository.save(escala));
    }

    @GetMapping("/profissional/{profissionalId}")
    public ResponseEntity<List<EscalaDTO>> listarPorProfissional(
            @PathVariable Long profissionalId
    ) {
        return ResponseEntity.ok(
                escalaService.listarPorProfissional(profissionalId)
        );
    }

    @PutMapping("/{id}/aceitar")
    public ResponseEntity<EscalaDTO> aceitarEscala(@PathVariable Long id) {
        try {
            EscalaDTO dto = escalaService.aceitar(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/recusar")
    public ResponseEntity<EscalaDTO> recusarEscala(@PathVariable Long id) {
        try {
            EscalaDTO dto = escalaService.recusar(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}