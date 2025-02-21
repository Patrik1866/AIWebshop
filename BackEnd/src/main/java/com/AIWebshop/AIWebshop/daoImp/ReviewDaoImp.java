package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.ReviewDao;
import com.AIWebshop.AIWebshop.entity.Reviews;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewDaoImp implements ReviewDao {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Reviews> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM Reviews", Reviews.class);

        List<Reviews> results = theQuerry.getResultList();

        return results;
    }

    @Override
    public Reviews findById(int id) {
        Reviews review = entityManager.find(Reviews.class, id);

        return review;
    }

    @Override
    public List<Reviews> findByUserId(int userId) {
        try {
            TypedQuery theQuerry = entityManager.createQuery("FROM Reviews WHERE userId = :userId", Reviews.class);
            theQuerry.setParameter("userId", userId);
            List<Reviews> reviews = theQuerry.getResultList();

            return  reviews;
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Reviews> findByProductId(int productId) {
        try {
            TypedQuery theQuerry = entityManager.createQuery("FROM Reviews WHERE productId = :productId", Reviews.class);
            theQuerry.setParameter("productId", productId);
            List<Reviews> reviews = theQuerry.getResultList();

            return  reviews;
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Reviews deleteById(Reviews review) {
        entityManager.remove(review);
        return null;
    }


    @Override
    @Transactional
    public Reviews save(Reviews review) {
        return entityManager.merge(review);
    }

}
