package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductDaoImp implements ProductDao {

    @Autowired
    private EntityManager entityManager;
    @Override
    public List<Product> findAll() {
        TypedQuery<Product> theQuerry = entityManager.createQuery("FROM Product", Product.class);

        List<Product> products = theQuerry.getResultList();

        return products;
    }

    @Override
    @Transactional
    public Product save(Product product) {
        Product dbProduct = entityManager.merge(product);

        return dbProduct;
    }
}
