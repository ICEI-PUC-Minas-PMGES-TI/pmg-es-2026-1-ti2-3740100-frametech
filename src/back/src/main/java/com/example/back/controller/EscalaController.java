package com.example.back.controller;

import com.example.back.dto.EscalaDTO;
import com.example.back.dto.EscalaRequestDTO;
import com.example.back.dto.EventoDetalheDTO;
import com.example.back.dto.TrocarProfissionalRequestDTO;
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
import java.util.Map;

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

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<EscalaDTO>> listarPorEvento(@PathVariable Long eventoId) {
        return ResponseEntity.ok(escalaService.listarPorEvento(eventoId));
    }

    @GetMapping("/evento/{eventoId}/detalhe")
    public ResponseEntity<EventoDetalheDTO> detalharEvento(@PathVariable Long eventoId) {
        try {
            return ResponseEntity.ok(escalaService.detalharEvento(eventoId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criarEscala(@RequestBody EscalaRequestDTO dto) {
        Evento evento = eventoRepository.findById(dto.getEventoId()).orElse(null);
        Usuario profissional = usuarioRepository.findById(dto.getProfissionalId()).orElse(null);
        Usuario adm = usuarioRepository.findById(dto.getAdmId()).orElse(null);

        if (evento == null || profissional == null || adm == null) {
            return ResponseEntity.badRequest().body("Evento, profissional ou administrador não encontrado.");
        }

        boolean jaEscalado = escalaRepository
                .findByEvento_IdAndProfissional_Id(evento.getId(), profissional.getId())
                .isPresent();

        if (jaEscalado) {
            return ResponseEntity.badRequest().body("Profissional já está escalado para este evento.");
        }

        Escala escala = new Escala();
        escala.setEvento(evento);
        escala.setProfissional(profissional);
        escala.setAdm(adm);
        escala.setDiaSemana(dto.getDiaSemana() != null ? dto.getDiaSemana() : "");
        escala.setStatus("PENDENTE");

        return ResponseEntity.ok(new EscalaDTO(escalaRepository.save(escala)));
    }

    @PostMapping("/evento/{eventoId}/adicionar")
    public ResponseEntity<?> adicionarProfissional(
            @PathVariable Long eventoId,
            @RequestBody Map<String, Object> body
    ) {
        try {
            Long profesionalId = Long.valueOf(body.get("profissionalId").toString());
            Long admId = Long.valueOf(body.get("admId").toString());
            String diaSemana = body.containsKey("diaSemana") ? body.get("diaSemana").toString() : "";

            EscalaDTO dto = escalaService.adicionarProfissionalAoEvento(eventoId, profesionalId, admId, diaSemana);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerEscala(@PathVariable Long id) {
        try {
            escalaService.removerProfissionalDaEscala(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/trocar-profissional")
    public ResponseEntity<?> trocarProfissional(
            @PathVariable Long id,
            @RequestBody TrocarProfissionalRequestDTO dto
    ) {
        try {
            EscalaDTO resultado = escalaService.trocarProfissional(id, dto.getNovoProfissionalId(), dto.getAdmId());
            return ResponseEntity.ok(resultado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profissional/{profissionalId}")
    public ResponseEntity<List<EscalaDTO>> listarPorProfissional(@PathVariable Long profissionalId) {
        return ResponseEntity.ok(escalaService.listarPorProfissional(profissionalId));
    }

    @PutMapping("/{id}/aceitar")
    public ResponseEntity<EscalaDTO> aceitarEscala(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(escalaService.aceitar(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/recusar")
    public ResponseEntity<EscalaDTO> recusarEscala(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(escalaService.recusar(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}