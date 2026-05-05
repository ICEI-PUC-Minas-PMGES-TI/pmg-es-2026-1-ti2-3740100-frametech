package com.example.back.controller;

import com.example.back.model.PerfilUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PerfilController {

    @GetMapping("/perfil")
    public PerfilUser getPerfil() {
        return new PerfilUser(
            "Pedro",
            "pedrosouza12@gmail.com",
            "31 9926734-3828",
            "Usuário"
        );
    }
}