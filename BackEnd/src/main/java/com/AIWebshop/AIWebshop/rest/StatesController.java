package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.States;
import com.AIWebshop.AIWebshop.service.StatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/states")
public class StatesController {
    @Autowired
    private StatesService statesService;

    @GetMapping
    public List<States> findAllStates() {
        return statesService.findAll();
    }
}
