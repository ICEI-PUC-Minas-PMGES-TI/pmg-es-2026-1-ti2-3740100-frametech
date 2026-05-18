package com.example.equipamentos.controller;

import com.example.equipamentos.model.Equipamento;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipamentos")
@CrossOrigin(origins = "http://localhost:5173")
public class EquipamentoController {

    @GetMapping
    public List<Equipamento> listar() {
        return List.of(
            new Equipamento(1L,"DRONE",13,7,"normal"),
            new Equipamento(2L,"CAMERA",7,0,"alerta"),
            new Equipamento(3L,"MAC",4,0,"ok")
        );
    }
}