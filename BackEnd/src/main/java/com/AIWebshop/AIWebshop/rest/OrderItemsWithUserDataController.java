package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;
import com.AIWebshop.AIWebshop.service.OrderItemsWithUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/manageOrders")
public class OrderItemsWithUserDataController {
    @Autowired
    private OrderItemsWithUserDataService orderItemsWithUserDataService;

    @GetMapping
    public List<OrderItemsWithUserData> findAll() {
        return orderItemsWithUserDataService.findAll();
    }

    @GetMapping("/{orderId}")
    public List<OrderItemsWithUserData> findByOrderId(int orderId) {
        return orderItemsWithUserDataService.findByOrderId(orderId);
    }

    @GetMapping("/{userId}")
    public List<OrderItemsWithUserData> findByUserId(int userId) {
        return orderItemsWithUserDataService.findByUserId(userId);
    }
}
