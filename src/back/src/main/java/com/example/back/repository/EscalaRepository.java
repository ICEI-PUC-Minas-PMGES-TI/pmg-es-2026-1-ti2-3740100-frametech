package com.example.back.repository;

import com.example.back.model.Escala;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EscalaRepository extends JpaRepository<Escala, Long> {

    List<Escala> findByProfissional_Id(Long profissionalId);

    List<Escala> findByProfissional_IdAndStatus(Long profissionalId, String status);
}
