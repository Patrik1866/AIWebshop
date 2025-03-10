package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.OrderItemsWithUserDataDao;
import com.AIWebshop.AIWebshop.entity.OrderItemsWithUserData;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Type;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Repository
public class OrderItemsWithUserDataDaoImp implements OrderItemsWithUserDataDao {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<OrderItemsWithUserData> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM OrderItemsWithUserData", OrderItemsWithUserData.class);

        List<OrderItemsWithUserData> results = theQuerry.getResultList();
        return results;
    }

    @Override
    public List<OrderItemsWithUserData> findByOrderId(int orderId) {
        TypedQuery<OrderItemsWithUserData> query = entityManager.createQuery(
                "SELECT o FROM OrderItemsWithUserData o WHERE o.orderId = :orderId",
                OrderItemsWithUserData.class
        );
        query.setParameter("orderId", orderId);
        List<OrderItemsWithUserData> results = query.getResultList();

        // Szűrjük a duplikátumokat Java-ban
        return results.stream()
                .collect(Collectors.toMap(
                        o -> o.getProductId(), // kulcs
                        Function.identity(), // érték
                        (existing, replacement) -> existing // ha duplikátum van, megtartjuk az elsőt
                ))
                .values()
                .stream()
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderItemsWithUserData> findByUserId(int userId) {
        TypedQuery theQuerry = entityManager.createQuery("FROM OrderItemsWithUserData WHERE userId = :userId", OrderItemsWithUserData.class);
        theQuerry.setParameter("userId", userId);
        List<OrderItemsWithUserData> results = theQuerry.getResultList();
        return results;
    }
}
