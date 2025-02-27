package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.CartViewDao;
import com.AIWebshop.AIWebshop.entity.CartView;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartViewDaoImp implements CartViewDao {

    @Autowired
    private EntityManager entityManager;
    @Override
    public List<CartView> findByUserId(int userId) {
        TypedQuery theQuery = entityManager.createQuery("FROM CartView WHERE userId = :userId", CartView.class);
        theQuery.setParameter("userId", userId);
        return theQuery.getResultList();
    }
}
