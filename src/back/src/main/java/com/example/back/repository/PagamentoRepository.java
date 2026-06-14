package com.example.back.repository;

import com.example.back.model.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

    Optional<Pagamento> findByEvento_Id(Long eventoId);

    long countByStatusIgnoreCase(String status);
}
