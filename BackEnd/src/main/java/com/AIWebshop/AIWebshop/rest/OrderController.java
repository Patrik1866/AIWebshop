package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Order;
import com.AIWebshop.AIWebshop.entity.OrderItems;
import com.AIWebshop.AIWebshop.req.OrderItemRequest;
import com.AIWebshop.AIWebshop.req.OrderRequest;
import com.AIWebshop.AIWebshop.service.OrderItemsService;
import com.AIWebshop.AIWebshop.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemsService orderItemsService;

    @GetMapping
    public List<Order> findAll() {
        return orderService.findAll();
    }

    @PutMapping
    @Transactional
    public Order saveOrder(@RequestBody OrderRequest orderRequest) {
        try {
            Order savedOrder = orderService.save(orderRequest.getOrder());
            System.out.println("Received OrderRequest: " + orderRequest);
            System.out.println("Order: " + orderRequest.getOrder());
            System.out.println("OrderItemRequests: " + orderRequest.getOrderItemRequests());

            if (orderRequest.getOrderItemRequests() != null && !orderRequest.getOrderItemRequests().isEmpty()) {
                for (OrderItemRequest orderItemRequest : orderRequest.getOrderItemRequests()) {
                    OrderItems orderItem = new OrderItems();
                    orderItem.setOrderId(savedOrder.getId());
                    orderItem.setProductId(orderItemRequest.getProductId());
                    orderItem.setQuantity(orderItemRequest.getQuantity());
                    orderItem.setPrice(orderItemRequest.getPrice());
                    orderItemsService.save(orderItem);
                }
            } else {
                throw new IllegalArgumentException("Order items list cannot be null or empty");
            }

            return savedOrder;
        } catch (Exception e) {
            throw new RuntimeException("Hiba a rendelés mentése közben", e);
        }
    }
}
