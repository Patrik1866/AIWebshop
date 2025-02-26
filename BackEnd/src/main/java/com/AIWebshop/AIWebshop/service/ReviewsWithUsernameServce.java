package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.ReviewsWithUsername;

import java.util.List;

public interface ReviewsWithUsernameServce {
    List<ReviewsWithUsername> findByUserId(int userId);
    List<ReviewsWithUsername> findByProductId(int productId);
}
