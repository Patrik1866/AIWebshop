package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.OrderItemsDao;
import com.AIWebshop.AIWebshop.entity.OrderItems;
import com.AIWebshop.AIWebshop.service.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemsServiceImp implements OrderItemsService {
    @Autowired
    private OrderItemsDao orderItemsDao;


    @Override
    public OrderItems save(OrderItems orderItems) {
        return orderItemsDao.save(orderItems);
    }
}
