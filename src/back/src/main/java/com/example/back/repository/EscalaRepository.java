package com.example.back.repository;

import com.example.back.model.Escala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EscalaRepository extends JpaRepository<Escala, Long> {
    // Caso queira buscar depois todas as escalas de um evento específico
    List<Escala> findByEvento_Id(Long eventoId);
}