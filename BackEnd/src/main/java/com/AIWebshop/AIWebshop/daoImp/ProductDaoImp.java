package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.ProductDao;
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

    @Override
    public Product findByProductId(int id) {
        Product product = entityManager.find(Product.class, id);

        return product;
    }

    @Override
    public List<Product> findByCategoryId(int id) {
        try{
            TypedQuery<Product> theQuerry = entityManager.createQuery("FROM Product WHERE categoryId = :id", Product.class);
            theQuerry.setParameter("id", id);
            List<Product> products = theQuerry.getResultList();
            return products;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Product> findBySubCategoryId(int id) {
        try{
            TypedQuery<Product> theQuerry = entityManager.createQuery("FROM Product WHERE subCategoryId = :id", Product.class);
            theQuerry.setParameter("id", id);
            List<Product> products = theQuerry.getResultList();
            return products;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    @Transactional
    public Product deleteById(Product product) {
        entityManager.remove(product);

        return null;
    }
}
