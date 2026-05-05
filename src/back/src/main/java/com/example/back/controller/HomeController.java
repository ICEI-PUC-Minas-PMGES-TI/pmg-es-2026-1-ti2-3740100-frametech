package com.example.back.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/home")
    public Map<String, Object> getHome() {

        Map<String, Object> response = new HashMap<>();

        response.put("nome", "Pedro");
        response.put("projetosAtivos", 2);
        response.put("mensagens", 3);

        Map<String, String> proximoEvento = new HashMap<>();
        proximoEvento.put("data", "19 Jun");
        response.put("proximoEvento", proximoEvento);

        List<Map<String, Object>> projetos = new ArrayList<>();

        Map<String, Object> projeto = new HashMap<>();
        projeto.put("nome", "Formatura Direito — Turma 2025");
        projeto.put("data", "28 de junho de 2025");
        projeto.put("horario", "19h00 — 23h00");
        projeto.put("servicos", Arrays.asList("Filmagem", "Fotografia", "Drone"));
        projeto.put("entrega", "15 de julho de 2025");

        projetos.add(projeto);

        response.put("projetos", projetos);

        return response;
    }
}