package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.entity.User;

import java.util.List;

public interface CartDao {
    List<Cart> findAll();
    Cart findById(int id);
    List<Cart> findByUserId(int userId);
    Cart deleteById(Cart cart);
    Cart saveCart(Cart cart);
}
