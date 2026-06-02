package com.example.back.services;

import com.example.back.model.TokenRecuperacaoSenha;
import com.example.back.model.Usuario;
import com.example.back.repository.TokenRecuperacaoSenhaRepository;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecuperacaoSenhaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenRecuperacaoSenhaRepository tokenRepository;

    public String gerarToken(String email) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Email nao encontrado.");
        }

        tokenRepository.findByEmail(email).ifPresent(tokenRepository::delete);

        String token = UUID.randomUUID().toString();

        TokenRecuperacaoSenha tokenEntity = new TokenRecuperacaoSenha();
        tokenEntity.setToken(token);
        tokenEntity.setEmail(email);
        tokenEntity.setExpiracao(LocalDateTime.now().plusMinutes(30));
        tokenEntity.setUsado(false);

        tokenRepository.save(tokenEntity);

        return token;
    }

    public void redefinirSenha(String token, String novaSenha) {
        if (novaSenha == null || novaSenha.length() < 8) {
            throw new RuntimeException("A senha deve ter no minimo 8 caracteres.");
        }

        TokenRecuperacaoSenha tokenEntity = tokenRepository
                .findByTokenAndUsadoFalse(token)
                .orElseThrow(() -> new RuntimeException("Token invalido ou ja utilizado."));

        if (LocalDateTime.now().isAfter(tokenEntity.getExpiracao())) {
            throw new RuntimeException("Token expirado. Solicite uma nova recuperacao.");
        }

        Usuario usuario = usuarioRepository
                .findByEmail(tokenEntity.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado."));

        usuario.setSenha(novaSenha);
        usuarioRepository.save(usuario);

        tokenEntity.setUsado(true);
        tokenRepository.save(tokenEntity);
    }

    public boolean validarToken(String token) {
        return tokenRepository.findByTokenAndUsadoFalse(token)
                .map(t -> LocalDateTime.now().isBefore(t.getExpiracao()))
                .orElse(false);
    }
}
