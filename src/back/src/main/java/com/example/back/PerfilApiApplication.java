package com.example.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.back")
public class PerfilApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PerfilApiApplication.class, args);
    }
}