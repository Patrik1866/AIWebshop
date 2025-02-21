package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Reviews;

import java.util.List;

public interface ReviewDao {
    List<Reviews> findAll();
    Reviews findById(int id);
    List<Reviews> findByUserId(int userId);
    List<Reviews> findByProductId(int productId);
    Reviews deleteById(Reviews review);
    Reviews save(Reviews review);
}
