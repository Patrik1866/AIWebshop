package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.ShipmentTypeDao;
import com.AIWebshop.AIWebshop.entity.ShipmentType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShipmentTypeDaoImp implements ShipmentTypeDao {

    @Autowired
    private EntityManager entityManager;
    @Override
    public List<ShipmentType> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM ShipmentType", ShipmentType.class);

        List<ShipmentType> results = theQuerry.getResultList();
        return results;
    }
}
