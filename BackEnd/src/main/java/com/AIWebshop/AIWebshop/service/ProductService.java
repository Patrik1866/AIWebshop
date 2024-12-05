package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    List<Product> findAll();
}
