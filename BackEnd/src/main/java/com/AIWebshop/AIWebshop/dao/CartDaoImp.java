package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Cart;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImp implements CartDao{
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Cart> findByUserId(int id) {
        try {
            TypedQuery<Cart> theQuerry = entityManager.createQuery("FROM Cart WHERE userId = :id", Cart.class);
            theQuerry.setParameter("id",id);
            List<Cart> carts = theQuerry.getResultList();

            return carts;
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
