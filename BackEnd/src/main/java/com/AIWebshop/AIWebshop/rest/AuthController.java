package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.Components.JwtUtil;
import com.AIWebshop.AIWebshop.dao.UserDao;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.req.AuthRequest;
import com.AIWebshop.AIWebshop.req.AuthResponse;
import com.AIWebshop.AIWebshop.service.CustomUserDetailsService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {

            User user = userService.findByUsername(authRequest.getUsername());
            if (user == null || !passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                throw new AuthenticationException("Invalid username or password") {
                };
            }
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            String token = jwtUtil.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).build();
        }
    }
}
