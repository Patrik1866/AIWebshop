package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Reviews;

import java.util.List;

public interface ReviewService {
    List<Reviews> findAll();
    Reviews findById(int id);
    List<Reviews> findByUserId(int userId);
    List<Reviews> findByProductId(int productId);
    void deleteById(int id);
    Reviews save(Reviews review);
}
