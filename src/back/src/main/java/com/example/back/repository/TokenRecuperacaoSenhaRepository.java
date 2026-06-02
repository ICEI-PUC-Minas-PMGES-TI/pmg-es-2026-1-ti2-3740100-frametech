package com.example.back.repository;

import com.example.back.model.TokenRecuperacaoSenha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRecuperacaoSenhaRepository extends JpaRepository<TokenRecuperacaoSenha, Long> {

    Optional<TokenRecuperacaoSenha> findByTokenAndUsadoFalse(String token);

    Optional<TokenRecuperacaoSenha> findByEmail(String email);
}
