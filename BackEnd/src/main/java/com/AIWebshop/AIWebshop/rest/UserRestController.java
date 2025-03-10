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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserRestController {

    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @GetMapping("address/{userId}")
    public Address findAddressByUserId(@PathVariable int userId){
        Address theAddress = userService.findAddressByUserId(userId);

        if (theAddress == null){
            throw new RuntimeException("Üres a szállítási cím");
        }
        return theAddress;
    }

    @PutMapping
    public User updateUser(@RequestBody User user){
        User theUser = userService.save(user);

        if (theUser == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            User existingUser = userService.findById(theUser.getId());
            user.setPassword(existingUser.getPassword());
        }
        return theUser;
    }

    @PutMapping("/password/{id}")
    public User updatePassword(@PathVariable int id, @RequestBody User user) {
        User theUser = userService.findById(id);

        if (theUser != null) {

            String encodedPassword = passwordEncoder.encode(user.getPassword());

            theUser.setPassword(encodedPassword);

            userService.save(theUser);

            return theUser;
        } else {
            throw new RuntimeException("Felhasználó nem létezik");
        }
    }


    @PutMapping("/{id}")
    public User updateUserById(@PathVariable int id, @RequestBody User user){
        User theUser = userService.findById(id);

        if (theUser != null) {
            userService.save(user);
            return theUser;
        }else{
               throw new RuntimeException("Felhasználó nem létezik");
        }
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody @Validated User user){
        logger.info("Ez van:",user);
        User createdUser = userService.save(user);
        logger.info("Ennek kéne lennie",createdUser);
        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }

    @PutMapping("/saveUser")
    public User saveUser(@RequestBody UserAddressRequest request) {
        User user = request.getUser();
        Address address = request.getAddress();

        if (user == null) {
            throw new IllegalArgumentException("User cannot be null.");
        }

        if (user.getId() != null) {
            User existingUser = userService.findById(user.getId());

            user.setPassword(existingUser.getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        User createdUser = userService.save(user);

        if (address != null) {
            address.setUserId(createdUser.getId());
            userService.saveAddress(address);
        }

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
