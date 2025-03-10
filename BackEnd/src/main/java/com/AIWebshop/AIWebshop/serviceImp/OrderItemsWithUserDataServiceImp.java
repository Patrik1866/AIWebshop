package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.OrderItemsWithUserDataDao;
import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;
import com.AIWebshop.AIWebshop.service.OrderItemsWithUserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemsWithUserDataServiceImp implements OrderItemsWithUserDataService {
    @Autowired
    private OrderItemsWithUserDataDao orderItemsWithUserDataDao;
    @Override
    public List<OrderItemsWithUserData> findAll() {
        return orderItemsWithUserDataDao.findAll();
    }

    @Override
    public List<OrderItemsWithUserData> findByOrderId(int orderId) {
        return orderItemsWithUserDataDao.findByOrderId(orderId);
    }

    @Override
    public List<OrderItemsWithUserData> findByUserId(int userId) {
        return orderItemsWithUserDataDao.findByUserId(userId);
    }
}
