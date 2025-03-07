package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.OrderItemsDao;
import com.AIWebshop.AIWebshop.entity.OrderItems;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderItemsDaoImp implements OrderItemsDao {
    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public OrderItems save(OrderItems orderItems) {
        entityManager.merge(orderItems);
        return orderItems;
    }
}
