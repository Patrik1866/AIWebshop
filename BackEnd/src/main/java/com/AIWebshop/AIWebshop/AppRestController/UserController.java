package com.AIWebshop.AIWebshop.AppRestController;

import com.AIWebshop.AIWebshop.Fields.User;
import com.AIWebshop.AIWebshop.Repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/listUsers")
    public List<User> ListUsers(){
        return userRepository.findAll();
    };
}
