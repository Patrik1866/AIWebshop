package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Cart;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImp implements CartDao{
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Cart> findAll() {
        TypedQuery<Cart> theQuerry = entityManager.createQuery("FROM Cart", Cart.class);

        List<Cart> results = theQuerry.getResultList();
        return results;
    }

    @Override
    public Cart findById(int id) {
        return entityManager.find(Cart.class, id);
    }

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

    @Override
    @Transactional
    public Cart deleteById(Cart cart) {
        entityManager.remove(cart);

        return null;
    }
}
