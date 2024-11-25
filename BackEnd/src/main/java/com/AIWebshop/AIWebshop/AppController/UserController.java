package com.AIWebshop.AIWebshop.AppController;

import com.AIWebshop.AIWebshop.Entities.User;
import com.AIWebshop.AIWebshop.Repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class    UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    @GetMapping("/listUsers")
    public List<User> ListUsers(){
        return userRepository.findAll();
    };

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password){
        String sql = "SELECT * FROM aiwebshop.users WHERE email = ? AND password = ?";
        List<Map<String, Object>> users = jdbcTemplate.queryForList(sql, email, password);

        if (!users.isEmpty()){
            Map<String, Object> user = users.get(0);
            Integer userId = (Integer) user.get("user_id");

            return ResponseEntity.ok("Successfull");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam String surname,
            @RequestParam String firstname,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String phone
    ){
        String checksql = "SELECT COUNT(*) FROM aiwebshop.users WHERE email = :email";
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);
        int count = namedParameterJdbcTemplate.queryForObject(checksql, params, Integer.class);
        if(count > 0){
            return ResponseEntity.badRequest().body("User with these email already exist");
        }

        String sql = "INSERT INTO aiwebshop.users (surname, firstname, email, password, phone) VALUES (?, ?, ?, ?, ?)";
        int result = jdbcTemplate.update(sql, surname, firstname, email, password, phone);

        if(result > 0){
            return ResponseEntity.ok("User registered succesfully!");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed user register");
        }
    }

}
