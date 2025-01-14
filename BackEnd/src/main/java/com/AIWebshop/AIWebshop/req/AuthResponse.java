package com.AIWebshop.AIWebshop.req;

import com.AIWebshop.AIWebshop.entity.User;

public class AuthResponse {

    private String token;
    private User user;

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }
}
