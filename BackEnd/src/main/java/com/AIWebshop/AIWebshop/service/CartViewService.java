package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.CartView;

import java.util.List;

public interface CartViewService {
    List<CartView> findByUserId(int userId);
}
