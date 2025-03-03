package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.CategoryDao;
import com.AIWebshop.AIWebshop.entity.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryDaoImp implements CategoryDao {
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<Category> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM Category", Category.class);

        List<Category> categories = theQuerry.getResultList();

        return categories;
    }
}
