package com.example.back.services;

import com.example.back.dto.EscalaDTO;
import com.example.back.model.Escala;
import com.example.back.repository.EscalaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EscalaService {

    @Autowired
    private EscalaRepository escalaRepository;

    public List<EscalaDTO> listarPorProfissional(Long profissionalId) {
        return escalaRepository
                .findByProfissional_Id(profissionalId)
                .stream()
                .map(EscalaDTO::new)
                .toList();
    }

    public EscalaDTO aceitar(Long escalaId) {

        Escala escala = escalaRepository
                .findById(escalaId)
                .orElseThrow(() ->
                        new RuntimeException("Escala não encontrada: " + escalaId)
                );

        escala.setStatus("ACEITA");

        return new EscalaDTO(escalaRepository.save(escala));
    }

    public EscalaDTO recusar(Long escalaId) {

        Escala escala = escalaRepository
                .findById(escalaId)
                .orElseThrow(() ->
                        new RuntimeException("Escala não encontrada: " + escalaId)
                );

        escala.setStatus("RECUSADA");

        return new EscalaDTO(escalaRepository.save(escala));
    }
}