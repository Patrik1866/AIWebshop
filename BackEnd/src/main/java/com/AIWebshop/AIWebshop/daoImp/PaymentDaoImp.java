package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.PaymentDao;
import com.AIWebshop.AIWebshop.entity.Payment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentDaoImp implements PaymentDao {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Payment> findAll() {
        TypedQuery<Payment> theQuery = entityManager.createQuery("FROM Payment", Payment.class);

        List<Payment> result = theQuery.getResultList();

        return result;
    }
}
