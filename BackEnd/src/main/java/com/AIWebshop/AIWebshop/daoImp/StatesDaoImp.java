package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.StatesDao;
import com.AIWebshop.AIWebshop.entity.States;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StatesDaoImp implements StatesDao {
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<States> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM States", States.class);

        List<States> results = theQuerry.getResultList();
        return results;
    }
}
