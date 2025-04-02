package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.Components.JwtUtil;
import com.AIWebshop.AIWebshop.req.AuthRequest;
import com.AIWebshop.AIWebshop.req.AuthResponse;
import com.AIWebshop.AIWebshop.serviceImp.CustomUserDetailsService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getUsername());
        if (passwordEncoder.matches(authRequest.getPassword(), userDetails.getPassword())) {
            
            Authentication authentication = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword());

            authentication = authenticationManager.authenticate(authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtUtil.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, userService.findByUsername(authRequest.getUsername())));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
}
}
