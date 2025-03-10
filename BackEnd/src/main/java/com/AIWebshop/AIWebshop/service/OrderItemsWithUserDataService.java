package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;

import java.util.List;

public interface OrderItemsWithUserDataService {
    List<OrderItemsWithUserData> findAll();
    List<OrderItemsWithUserData> findByOrderId(int orderId);
    List<OrderItemsWithUserData> findByUserId(int userId);
}
