package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.CartView;

import java.util.List;

public interface CartViewDao {
    List<CartView> findByUserId(int userId);
}
