package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;

import java.util.List;

public interface OrderItemsWithUserDataDao {
    List<OrderItemsWithUserData> findAll();
    List<OrderItemsWithUserData> findByOrderId(int orderId);
    List<OrderItemsWithUserData> findByUserId(int userId);
}
