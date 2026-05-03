package com.example.back.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping
    public Map<String, Object> getHome() {
        Map<String, Object> data = new HashMap<>();

        data.put("projetos", 24);
        data.put("clientes", 148);
        data.put("receita", "87k");
        data.put("entregas", 129);

        return data;
    }
}