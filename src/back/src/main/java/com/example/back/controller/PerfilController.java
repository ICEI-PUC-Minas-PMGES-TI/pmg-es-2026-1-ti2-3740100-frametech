package com.example.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.back.model.Usuario;
import com.example.back.services.UsuarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/{id}")
    public Usuario buscarPerfil(@PathVariable Long id) {

        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Usuario atualizarPerfil(
            @PathVariable Long id,
            @RequestBody Usuario dadosAtualizados
    ) {

        return service.atualizar(id, dadosAtualizados);
    }

    @DeleteMapping("/{id}")
    public String deletarPerfil(@PathVariable Long id) {

        service.deletar(id);

        return "Usuário deletado com sucesso";
    }

    @GetMapping("/teste")
    public String teste() {

        return "Perfil funcionando";
    }
}