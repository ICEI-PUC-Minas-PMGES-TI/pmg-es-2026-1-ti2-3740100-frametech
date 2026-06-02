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
        validarSenha(usuario.getSenha());
        validarTelefone(usuario.getTelefone());
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

        if (usuarioAtualizado.getTelefone() != null && !usuarioAtualizado.getTelefone().isBlank()) {
            validarTelefone(usuarioAtualizado.getTelefone());
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

    private void validarSenha(String senha) {
        if (senha == null || senha.length() < 8) {
            throw new RuntimeException("A senha deve ter no minimo 8 caracteres.");
        }
    }

    private void validarTelefone(String telefone) {
        if (telefone == null || telefone.isBlank()) {
            return;
        }
        String apenasNumeros = telefone.replaceAll("\\D", "");
        if (apenasNumeros.length() < 10 || apenasNumeros.length() > 11) {
            throw new RuntimeException("Telefone invalido. Informe entre 10 e 11 digitos numericos.");
        }
    }
}
