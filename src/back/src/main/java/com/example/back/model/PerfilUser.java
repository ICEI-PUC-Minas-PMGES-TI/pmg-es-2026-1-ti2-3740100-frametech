 
 package com.example.back.model;

public class PerfilUser {

    private String nome;
    private String email;
    private String telefone;
    private String tipo;

    public PerfilUser(String nome, String email, String telefone, String tipo) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipo = tipo;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getTipo() {
        return tipo;
    }
}