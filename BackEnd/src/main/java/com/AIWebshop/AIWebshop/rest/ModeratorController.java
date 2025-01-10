package com.AIWebshop.AIWebshop.rest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/moderator")
public class ModeratorController {

    @GetMapping

    @PreAuthorize("hasAuthority('MODERATOR', 'ADMIN')")
    public String moderator(){
        return "Welcome, moderator!";
    }
}
