package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Cart;

import java.util.List;

public interface CartDao {
    Cart findById(int id);
    List<Cart> findByUserId(int id);
    Cart deleteById(Cart cart);
}
