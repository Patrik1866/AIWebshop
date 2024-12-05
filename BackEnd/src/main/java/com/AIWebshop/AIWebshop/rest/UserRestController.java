package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.req.UserAddressRequest;
import com.AIWebshop.AIWebshop.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserRestController {

    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public User findById(@PathVariable int userId){
        User theUser = userService.findById(userId);
        if (theUser == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }

        return theUser;
    }

    @PutMapping
    public User updateUser(@RequestBody User user){
        User theUser = userService.save(user);

        return theUser;
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody @Validated User user){
        logger.info("Ez van:",user);
        User createdUser = userService.save(user);
        logger.info("Ennek kéne lennie",createdUser);
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
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


    @DeleteMapping("/{userId}")
    public String delete(@PathVariable int userId){
        User user = userService.findById(userId);

        if(user == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }
        userService.deleteById(userId);

        return "DELETE";
    }

}
