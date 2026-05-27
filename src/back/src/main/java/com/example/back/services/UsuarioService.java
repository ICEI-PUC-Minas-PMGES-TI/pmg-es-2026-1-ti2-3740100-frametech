package com.example.back.services;

import com.example.back.model.Usuario;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario cadastrar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> login(String email, String senha) {
        return repository.findByEmailAndSenha(email, senha);
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setTelefone(usuarioAtualizado.getTelefone());
        usuario.setTipo(usuarioAtualizado.getTipo());
        usuario.setFotoPerfil(usuarioAtualizado.getFotoPerfil());

        return repository.save(usuario);
    }

    public void deletar(Long id) {

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario != null) {
            repository.delete(usuario);
        }
    }

    public Usuario atualizarFoto(Long id, String foto) {

        Usuario usuario = repository.findById(id).orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setFotoPerfil(foto);

        return repository.save(usuario);
    }

    public List<Usuario> listarProfissionais() {
        return repository.findAll();
    }
}