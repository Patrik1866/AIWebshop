package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Cart;

import java.util.List;

public interface CartDao {
    List<Cart> findByUserId(int id);
}
