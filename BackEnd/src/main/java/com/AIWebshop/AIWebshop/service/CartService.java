package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.User;

import java.util.List;

public interface CartService {
    List<Cart> findAll();
    Cart findById(int id);
    List<Cart> findByUserId(int id);
    void deleteById (int id);
    Cart saveCart(Cart cart);
}
