package com.example.back.controller;

import com.example.back.dto.EscalaDTO;
import com.example.back.model.Escala;
import com.example.back.repository.EscalaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escalas")
@CrossOrigin(origins = "*")
public class EscalaController {

    @Autowired
    private EscalaRepository escalaRepository;

    @GetMapping("/profissional/{profissionalId}")
    public List<EscalaDTO> listarEscalasDoProfissional(
            @PathVariable Long profissionalId
    ) {
        return escalaRepository.findByProfissional_Id(profissionalId)
                .stream()
                .map(EscalaDTO::new)
                .toList();
    }

    @PutMapping("/{escalaId}/aceitar")
    public EscalaDTO aceitarEscala(
            @PathVariable Long escalaId
    ) {
        Escala escala = escalaRepository.findById(escalaId).orElse(null);

        if (escala == null) {
            return null;
        }

        escala.setStatus("ACEITA");

        return new EscalaDTO(escalaRepository.save(escala));
    }

    @PutMapping("/{escalaId}/recusar")
    public EscalaDTO recusarEscala(
            @PathVariable Long escalaId
    ) {
        Escala escala = escalaRepository.findById(escalaId).orElse(null);

        if (escala == null) {
            return null;
        }

        escala.setStatus("RECUSADA");

        return new EscalaDTO(escalaRepository.save(escala));
    }
}
