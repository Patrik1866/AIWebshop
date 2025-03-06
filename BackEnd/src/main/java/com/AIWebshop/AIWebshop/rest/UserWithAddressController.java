package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.entity.UsersWithAddress;
import com.AIWebshop.AIWebshop.service.UserService;
import com.AIWebshop.AIWebshop.service.UserWithAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/userWithAddress")
public class UserWithAddressController {

    @Autowired
    private UserWithAddressService userWithAddressService;
    @Autowired
    private UserService userService;

    @GetMapping
    public UsersWithAddress findUserWithAddressByUserId(Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("Felhasználó nem létezik");
        }
        return userWithAddressService.findUserWithAddressByUserId(user.getId());
    }
}
