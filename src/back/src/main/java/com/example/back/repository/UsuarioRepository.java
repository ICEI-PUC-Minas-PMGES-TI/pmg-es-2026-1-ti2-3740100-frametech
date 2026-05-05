package com.example.back.repository;

import com.example.back.model.Usuario;
import java.util.*;
import java.util.ArrayList;

import com.example.back.model.Usuario;

public class UsuarioRepository {
    private List<Usuario> usuarios = new ArrayList<>();
    private Long contadorId = 1L;

    public Usuario salvar(Usuario usuario) {
        usuario.setId(contadorId++);
        usuarios.add(usuario);
        return usuario;
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarios.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();
    }

}
