package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.OrderDao;
import com.AIWebshop.AIWebshop.entity.Order;
import com.AIWebshop.AIWebshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    private OrderDao orderDao;
    @Override
    public List<Order> findAll() {
        return orderDao.findAll();
    }

    @Override
    public Order save(Order order) {
        return orderDao.save(order);
    }
}
