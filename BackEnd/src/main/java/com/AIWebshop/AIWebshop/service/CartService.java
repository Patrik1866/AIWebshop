package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Cart;

import java.util.List;

public interface CartService {
    List<Cart> findByUserId(int id);
}
