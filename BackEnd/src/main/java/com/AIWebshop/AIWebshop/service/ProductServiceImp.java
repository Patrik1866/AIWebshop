package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.dao.ProductDao;
import com.AIWebshop.AIWebshop.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService{

    @Autowired
    private ProductDao productDao;
    @Override
    public List<Product> findAll() {
        return productDao.findAll();
    }

    @Override
    public Product save(Product product) {
        return productDao.save(product);
    }

    @Override
    public Product findByProductId(int id) {
        return  productDao.findByProductId(id);
    }

    @Override
    public List<Product> findByCategoryId(int id) {
        return productDao.findByCategoryId(id);
    }

    @Override
    public List<Product> findBySubCategoryId(int id) {
        return productDao.findBySubCategoryId(id);
    }

    @Override
    public void deleteById(int id) {
        Product product = productDao.findByProductId(id);
        productDao.deleteById(product);
    }
}