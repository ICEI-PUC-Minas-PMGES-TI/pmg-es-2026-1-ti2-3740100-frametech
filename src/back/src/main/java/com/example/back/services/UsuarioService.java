package com.example.back.services;

import com.example.back.model.Usuario;
import com.example.back.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario cadastrar(Usuario usuario) {

        usuario.setNome(campoObrigatorio(usuario.getNome(), "Nome"));
        usuario.setEmail(campoObrigatorio(usuario.getEmail(), "Email"));
        usuario.setSenha(campoObrigatorio(usuario.getSenha(), "Senha"));
        usuario.setTipo(campoObrigatorio(usuario.getTipo(), "Tipo"));
        usuario.setTelefone(limpar(usuario.getTelefone()));

        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email ja cadastrado");
        }

        return repository.save(usuario);
    }

    public Usuario login(String email, String senha, String tipo) {

        Usuario usuario = repository.findByEmail(campoObrigatorio(email, "Email"))
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        if (!usuario.getSenha().equals(senha)) {
            throw new RuntimeException("Senha invalida");
        }

        if (!tiposIguais(usuario.getTipo(), tipo)) {
            throw new RuntimeException("Tipo de conta invalido");
        }

        return usuario;
    }

    public Usuario buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    public Usuario atualizar(Long id, Usuario dadosAtualizados) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        String nome = campoObrigatorio(dadosAtualizados.getNome(), "Nome");
        String email = campoObrigatorio(dadosAtualizados.getEmail(), "Email");

        if (repository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new RuntimeException("Email ja cadastrado");
        }

        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setTelefone(limpar(dadosAtualizados.getTelefone()));

        if (
            dadosAtualizados.getSenha() != null &&
            !dadosAtualizados.getSenha().trim().isEmpty()
        ) {
            usuario.setSenha(dadosAtualizados.getSenha().trim());
        }

        return repository.save(usuario);
    }

    public Usuario atualizarFoto(Long id, String foto) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        usuario.setFotoPerfil(foto);

        return repository.save(usuario);
    }

    public void deletar(Long id) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        repository.delete(usuario);
    }

    private String campoObrigatorio(String valor, String campo) {

        String valorLimpo = limpar(valor);

        if (valorLimpo == null || valorLimpo.isEmpty()) {
            throw new RuntimeException(campo + " obrigatorio");
        }

        return valorLimpo;
    }

    private String limpar(String valor) {

        if (valor == null) {
            return null;
        }

        return valor.trim();
    }

    private boolean tiposIguais(String tipoSalvo, String tipoLogin) {

        String salvo = normalizarTipo(tipoSalvo);
        String login = normalizarTipo(tipoLogin);

        return salvo != null && salvo.equals(login);
    }

    private String normalizarTipo(String tipo) {

        String tipoLimpo = limpar(tipo);

        if (tipoLimpo == null) {
            return null;
        }

        if (tipoLimpo.equalsIgnoreCase("adm")) {
            return "empresa";
        }

        return tipoLimpo.toLowerCase();
    }
}
