package com.example.back.services;

import com.example.back.model.Usuario;
import com.example.back.repository.UsuarioRepository;

public class UsuarioService {
     private UsuarioRepository repository = new UsuarioRepository();

    public Usuario cadastrar(Usuario usuario) {
        if (repository.buscarPorEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }

        return repository.salvar(usuario);
    }

    public Usuario login(String email, String senha) {
        Usuario usuario = repository.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getSenha().equals(senha)) {
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }
}
