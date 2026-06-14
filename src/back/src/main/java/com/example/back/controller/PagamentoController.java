package com.example.back.controller;

import com.example.back.dto.IndicadorPagamentosDTO;
import com.example.back.services.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET})
@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService service;

    @GetMapping("/indicador-aprovados")
    public IndicadorPagamentosDTO indicadorPagamentosAprovados() {
        return service.calcularPercentualAprovados();
    }
}
