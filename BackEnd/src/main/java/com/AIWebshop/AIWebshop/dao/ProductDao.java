package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Product;

import java.util.List;

public interface ProductDao {
    List<Product> findAll();
    Product save(Product product);
    Product findByProductId(int id);
    List<Product> findByCategoryId(int id);
    List<Product> findBySubCategoryId(int id);
}
