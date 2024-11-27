package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.req.UserAddressRequest;
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
        User theUser = userService.save(user);

        return theUser;
    }

    @PostMapping("/users")
    public User save(@RequestBody User user){
        User createdUser = userService.save(user);

        return ResponseEntity.ok(createdUser).getBody();
    }

     @PostMapping("/saveUser")
     public User save(@RequestBody UserAddressRequest request){
        User user = request.getUser();
        Address address = request.getAddress();

        User createdUser = userService.save(user);
        address.setUserId(createdUser.getId());

        Address createdAddress = userService.saveAddress(address);

        return createdUser;
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
