package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;
import com.AIWebshop.AIWebshop.service.OrderItemsWithUserDataService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/manageOrders")
public class OrderItemsWithUserDataController {

    @Autowired
    private OrderItemsWithUserDataService orderItemsWithUserDataService;

    @GetMapping
    public List<OrderItemsWithUserData> findAll() {
        return orderItemsWithUserDataService.findAll();
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItemsWithUserData> findByOrderId(@PathVariable int orderId) {
        List<OrderItemsWithUserData> result = orderItemsWithUserDataService.findByOrderId(orderId);
        return result;
    }

    @GetMapping("/user/{userId}")
    public List<OrderItemsWithUserData> findByUserId(int userId) {
        return orderItemsWithUserDataService.findByUserId(userId);
    }
}
