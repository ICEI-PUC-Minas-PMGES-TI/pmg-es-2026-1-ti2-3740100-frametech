package com.example.back.services;

import com.example.back.model.Usuario;
import com.example.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario cadastrar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> login(String email, String senha) {

        Optional<Usuario> user = repository.findByEmail(email);

        if (user.isPresent() && user.get().getSenha().equals(senha)) {
            return user;
        }

        return Optional.empty();
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Usuario atualizar(Long id, Usuario novo) {
        Usuario user = repository.findById(id).orElseThrow();

        user.setNome(novo.getNome());
        user.setEmail(novo.getEmail());
        user.setTelefone(novo.getTelefone());

        return repository.save(user);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Usuario atualizarFoto(Long id, String foto) {
        Usuario user = repository.findById(id).orElseThrow();
        user.setFotoPerfil(foto);
        return repository.save(user);
    }
}