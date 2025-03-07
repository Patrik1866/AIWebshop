package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.OrderDao;
import com.AIWebshop.AIWebshop.entity.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImp implements OrderDao {

    @Autowired
    private EntityManager entityManager;
    @Override
    public List<Order> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM Order", Order.class);

        List<Order> results = theQuerry.getResultList();
        return results;
    }

    @Override
    @Transactional
    public Order save(Order order) {
        Order theOrder = entityManager.merge(order);

        return theOrder;
    }
}
