package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.ReviewsWithUsername;

import java.util.List;

public interface ReviewsWithUsernameDao {
    List<ReviewsWithUsername> findAll();
    List<ReviewsWithUsername> findByProductId(int productId);
}
