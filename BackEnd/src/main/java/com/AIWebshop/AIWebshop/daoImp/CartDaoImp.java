package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.CartDao;
import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImp implements CartDao {
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
    public List<Cart> findByUserId(int userId) {
        try {
            TypedQuery<Cart> theQuery = entityManager.createQuery("FROM Cart c WHERE c.user = :userId", Cart.class);
            theQuery.setParameter("userId", userId);
            return theQuery.getResultList();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Cart deleteById(Cart cart) {
        entityManager.remove(cart);

        return null;
    }

    @Transactional
    @Override
    public Cart saveCart(Cart cart) {
        Cart savedCart = entityManager.merge(cart);

        return savedCart;
    }
}
