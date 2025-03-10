package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAll();
    Order save (Order order);
    List<Order> findByUserId(int userId);
}
