package com.example.back.repository;

import com.example.back.model.EventoEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventoEquipamentoRepository extends JpaRepository<EventoEquipamento, Long> {

    List<EventoEquipamento> findByEvento_Id(Long eventoId);

    List<EventoEquipamento> findByEquipamento_Id(Long equipamentoId);

    Optional<EventoEquipamento> findByEvento_IdAndEquipamento_Id(Long eventoId, Long equipamentoId);
}
