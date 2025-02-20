package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {

    List<Product> findAll();
    Product save (Product product);
    Product findByProductId(int id);
    List<Product> findByCategoryId(int id);
    List<Product> findBySubCategoryId(int id);
    void deleteById(int id);
}
