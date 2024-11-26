package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public User findById(@PathVariable int userId){
        User theUser = userService.findById(userId);
        if (theUser == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }

        return theUser;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user){
        if (user.getAddresses() != null){
            user.getAddresses().forEach(address -> address.setUser(user));
        }
        User theUser = userService.save(user);

        return theUser;
    }

    @PostMapping("/users")
    public User createUserWithAddress(@RequestBody User user){
        User createdUser = userService.createUserWithAddress(user);

        return ResponseEntity.ok(createdUser).getBody();
    }


    @DeleteMapping("/users/{userId}")
    public String delete(@PathVariable int userId){
        User user = userService.findById(userId);

        if(user == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }
        userService.deleteById(userId);

        return "DELETE";
    }
}
