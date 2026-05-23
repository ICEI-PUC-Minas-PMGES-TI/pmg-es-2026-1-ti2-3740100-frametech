package com.example.back.repository;

import com.example.back.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByUsuario_Id(Long usuarioId);
}