package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Cart;

import java.util.List;

public interface CartService {
    List<Cart> findAll();
    Cart findById(int id);
    List<Cart> findByUserId(int id);
    void deleteById (int id);
}
