package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.Components.JwtUtil;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.req.AuthRequest;
import com.AIWebshop.AIWebshop.req.AuthResponse;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            User user = userService.findByUsername(authRequest.getUsername());
            if (user == null || !passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                throw new org.springframework.security.core.AuthenticationException("Invalid username or password") {
                };
            }

            List<GrantedAuthority> authorities = new ArrayList<>();
            if (user.getIsAdmin()) {
                authorities.add(new SimpleGrantedAuthority("ADMIN"));
            }
            if (user.getIsModerator()) {
                authorities.add(new SimpleGrantedAuthority("MODERATOR"));
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword(), authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtUtil.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, user));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

}
