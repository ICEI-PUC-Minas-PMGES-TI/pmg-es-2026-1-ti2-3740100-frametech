package com.example.back.controller;

import com.example.back.dto.RecuperacaoSenhaRequestDTO;
import com.example.back.dto.RedefinirSenhaRequestDTO;
import com.example.back.services.RecuperacaoSenhaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class RecuperacaoSenhaController {

    @Autowired
    private RecuperacaoSenhaService recuperacaoSenhaService;

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> solicitarRecuperacao(@RequestBody RecuperacaoSenhaRequestDTO dto) {
        try {
            String token = recuperacaoSenhaService.gerarToken(dto.getEmail());
            return ResponseEntity.ok().body(
                    new TokenResponse("Token gerado com sucesso. Use o token para redefinir sua senha.", token)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<?> redefinirSenha(@RequestBody RedefinirSenhaRequestDTO dto) {
        try {
            recuperacaoSenhaService.redefinirSenha(dto.getToken(), dto.getNovaSenha());
            return ResponseEntity.ok("Senha redefinida com sucesso.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/validar-token")
    public ResponseEntity<?> validarToken(@RequestParam String token) {
        boolean valido = recuperacaoSenhaService.validarToken(token);
        if (valido) {
            return ResponseEntity.ok("Token valido.");
        }
        return ResponseEntity.badRequest().body("Token invalido ou expirado.");
    }

    record TokenResponse(String mensagem, String token) {}
}
