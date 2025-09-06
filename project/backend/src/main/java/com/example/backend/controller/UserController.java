package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    
    @GetMapping("/")
    public String home() {
        return "Welcome World";
    }
}