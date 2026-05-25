package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.back.model.Usuario;
import com.example.back.services.UsuarioService;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/cadastro")
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return service.cadastrar(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {

        Optional<Usuario> user = service.login(
                usuario.getEmail(),
                usuario.getSenha()
        );

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(401).body("Email ou senha inválidos");
    }

    @GetMapping("/perfil/{id}")
    public Usuario buscarPerfil(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/perfil/{id}")
    public Usuario atualizarPerfil(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.atualizar(id, usuario);
    }

    @DeleteMapping("/perfil/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PutMapping("/foto/{id}")
    public Usuario atualizarFoto(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.atualizarFoto(id, usuario.getFotoPerfil());
    }

    @GetMapping("/teste")
    public String teste() {
        return "API funcionando";
    }
}