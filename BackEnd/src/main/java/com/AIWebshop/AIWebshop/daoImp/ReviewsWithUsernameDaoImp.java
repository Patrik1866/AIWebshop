package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.ReviewsWithUsernameDao;
import com.AIWebshop.AIWebshop.entity.Reviews;
import com.AIWebshop.AIWebshop.entity.ReviewsWithUsername;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewsWithUsernameDaoImp implements ReviewsWithUsernameDao {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ReviewsWithUsername> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM ReviewsWithUsername", ReviewsWithUsername.class);

        List<ReviewsWithUsername> results = theQuerry.getResultList();
        return results;
    }

    @Override
    public List<ReviewsWithUsername> findByProductId(int productId) {
        try {
            TypedQuery theQuerry = entityManager.createQuery("FROM ReviewsWithUsername WHERE productId = :productId", ReviewsWithUsername.class);
            theQuerry.setParameter("productId", productId);
            List<ReviewsWithUsername> reviews = theQuerry.getResultList();

            return  reviews;
        } catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
