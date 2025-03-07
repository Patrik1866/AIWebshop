package com.AIWebshop.AIWebshop.req;

import com.AIWebshop.AIWebshop.entity.Order;

import java.util.List;

public class OrderRequest {
    private Order order;
    private List<OrderItemRequest> orderItems;

    public OrderRequest() {}



    // Getterek és setterek
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<OrderItemRequest> getOrderItemRequests() {
        return orderItems;
    }

    public void setOrderItemRequests(List<OrderItemRequest> orderItemRequests) {
        this.orderItems = orderItemRequests;
    }
}
