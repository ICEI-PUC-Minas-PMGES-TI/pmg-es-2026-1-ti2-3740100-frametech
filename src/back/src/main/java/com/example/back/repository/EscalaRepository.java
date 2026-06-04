package com.example.back.repository;

import com.example.back.model.Escala;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EscalaRepository
        extends JpaRepository<Escala, Long> {

    List<Escala> findByProfissional_Id(Long profissionalId);

    List<Escala> findByProfissional_IdAndStatus(Long profissionalId, String status);

    List<Escala> findByStatus(String status);

    Optional<Escala> findByEvento_IdAndProfissional_Id(Long eventoId, Long profissionalId);

    
    // List<Escala> findByEvento_Id(Long eventoId); 

    
    List<Escala> findByEvento_IdAndStatus(Long eventoId, String status);
    List<Escala> findByEvento_Id(Long eventoId);
}
