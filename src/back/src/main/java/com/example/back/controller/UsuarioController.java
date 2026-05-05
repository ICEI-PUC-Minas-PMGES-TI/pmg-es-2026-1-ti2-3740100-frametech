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
        return service.login(usuario.getEmail(), usuario.getSenha());
    }
    
     @GetMapping("/teste")
    public String teste() {
    return "API funcionando";
    }

}