package com.AIWebshop.AIWebshop.AppRestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/listUsers")
    public String UsersList(){
        return "SZosofsd";
    };
}
