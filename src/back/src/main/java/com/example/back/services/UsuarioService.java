package com.example.back.services;

import com.example.back.model.Usuario;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    // LOGIN
    public Usuario login(String email, String senha, String tipo) {

        Usuario usuario = repository.findByEmail(campoObrigatorio(email, "Email"))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuario nao encontrado"
                ));

        if (!usuario.getSenha().equals(senha)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Senha invalida"
            );
        }

        if (!tiposIguais(usuario.getTipo(), tipo)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Tipo de conta invalido"
            );
        }

        return usuario;
    }

    // PERFIL
    public Usuario buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario nao encontrado"
                ));
    }

    // CADASTRO
    public Usuario cadastrar(Usuario usuario) {

        usuario.setNome(campoObrigatorio(usuario.getNome(), "Nome"));
        usuario.setEmail(campoObrigatorio(usuario.getEmail(), "Email"));
        usuario.setSenha(campoObrigatorio(usuario.getSenha(), "Senha"));
        usuario.setTipo(campoObrigatorio(usuario.getTipo(), "Tipo"));
        usuario.setTelefone(limpar(usuario.getTelefone()));

        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email ja cadastrado"
            );
        }

        return repository.save(usuario);
    }

    // UPDATE PERFIL
    public Usuario atualizar(Long id, Usuario dados) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario nao encontrado"
                ));

        String nome = campoObrigatorio(dados.getNome(), "Nome");
        String email = campoObrigatorio(dados.getEmail(), "Email");

        if (repository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email ja cadastrado"
            );
        }

        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setTelefone(limpar(dados.getTelefone()));

        if (dados.getSenha() != null && !dados.getSenha().trim().isEmpty()) {
            usuario.setSenha(dados.getSenha().trim());
        }

        return repository.save(usuario);
    }

    // FOTO
    public Usuario atualizarFoto(Long id, String foto) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario nao encontrado"
                ));

        usuario.setFotoPerfil(foto);
        return repository.save(usuario);
    }

    // DELETE
    public void deletar(Long id) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuario nao encontrado"
                ));

        repository.delete(usuario);
    }

    // HELPERS
    private String campoObrigatorio(String valor, String campo) {
        String v = limpar(valor);

        if (v == null || v.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    campo + " obrigatorio"
            );
        }

        return v;
    }

    private String limpar(String valor) {
        return valor == null ? null : valor.trim();
    }

    private boolean tiposIguais(String a, String b) {
        return a != null && a.equalsIgnoreCase(b);
    }
}