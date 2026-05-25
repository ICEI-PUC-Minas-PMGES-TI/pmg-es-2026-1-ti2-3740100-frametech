package com.example.back.controller;

import com.example.back.model.Escala;
import com.example.back.model.Evento;
import com.example.back.model.Usuario;
import com.example.back.repository.EscalaRepository;
import com.example.back.repository.EventoRepository;
import com.example.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/escala")
@CrossOrigin(origins = "http://localhost:5173") // Permite a conexão com o seu Front-end React
public class EscalaController {

    @Autowired
    private EscalaRepository escalaRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Rota para o Administrador escalar uma lista de profissionais para um evento específico
    @PostMapping("/{eventoId}")
    public ResponseEntity<String> escalarEquipe(
            @PathVariable Long eventoId, 
            @RequestBody List<Long> profissionaisIds) {
        
        // 1. Verifica se o evento realmente existe no banco
        Optional<Evento> eventoOpt = eventoRepository.findById(eventoId);
        if (eventoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Erro: Evento não encontrado!");
        }
        Evento evento = eventoOpt.get();

        // 2. Passa de ID em ID guardando o vínculo na tabela de escala
        int vinculadosComSucesso = 0;
        for (Long profId : profissionaisIds) {
            Optional<Usuario> usuarioOpt = usuarioRepository.findById(profId);
            
            // Só salva se o profissional com aquele ID existir de verdade no banco
            if (usuarioOpt.isPresent()) {
                Escala novaEscala = new Escala();
                novaEscala.setEvento(evento);
                novaEscala.setProfissional(usuarioOpt.get());
                
                escalaRepository.save(novaEscala);
                vinculadosComSucesso++;
            }
        }

        if (vinculadosComSucesso == 0) {
            return ResponseEntity.badRequest().body("Aviso: Nenhum profissional válido foi encontrado com os IDs fornecidos.");
        }

        return ResponseEntity.ok("Equipe escalada e salva no banco de dados com sucesso! (" + vinculadosComSucesso + " profissionais vinculados)");
    }
}