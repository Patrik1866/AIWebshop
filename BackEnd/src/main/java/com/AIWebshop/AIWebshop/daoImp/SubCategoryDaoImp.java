package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.SubCategoryDao;
import com.AIWebshop.AIWebshop.entity.SubCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SubCategoryDaoImp implements SubCategoryDao {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<SubCategory> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM SubCategory", SubCategory.class);

        List<SubCategory> results = theQuerry.getResultList();

        return results;
    }

    @Override
    public List<SubCategory> findByCategoryId(int id) {
        TypedQuery theQuerry = entityManager.createQuery("FROM SubCategory WHERE categoryId = :id", SubCategory.class);
        theQuerry.setParameter("id", id);
        List<SubCategory> results = theQuerry.getResultList();
        return results;
    }
}
