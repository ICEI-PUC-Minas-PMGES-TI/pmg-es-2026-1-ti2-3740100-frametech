package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.back.model.Usuario;
import com.example.back.services.UsuarioService;

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
    public Usuario login(@RequestBody Usuario usuario) {
        return service.login(
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getTipo()
        );
    }

    // 🔵 GET PERFIL
    @GetMapping("/perfil/{id}")
    public Usuario buscarPerfil(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // 🟢 UPDATE PERFIL (FALTAVA NO SEU CÓDIGO)
    @PutMapping("/perfil/{id}")
    public Usuario atualizarPerfil(
            @PathVariable Long id,
            @RequestBody Usuario usuario
    ) {
        return service.atualizar(id, usuario);
    }

    // 🔴 DELETE CONTA (FALTAVA NO SEU CÓDIGO)
    @DeleteMapping("/perfil/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    // 🟣 FOTO
    @PutMapping("/foto/{id}")
    public Usuario atualizarFoto(
            @PathVariable Long id,
            @RequestBody Usuario usuario
    ) {
        return service.atualizarFoto(id, usuario.getFotoPerfil());
    }

    @GetMapping("/teste")
    public String teste() {
        return "API funcionando";
    }
}