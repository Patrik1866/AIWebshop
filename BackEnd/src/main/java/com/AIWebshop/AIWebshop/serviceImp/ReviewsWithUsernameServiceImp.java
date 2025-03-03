package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.ReviewsWithUsernameDao;
import com.AIWebshop.AIWebshop.entity.ReviewsWithUsername;
import com.AIWebshop.AIWebshop.service.ReviewsWithUsernameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsWithUsernameServiceImp implements ReviewsWithUsernameService {
    @Autowired
    private ReviewsWithUsernameDao reviewsWithUsernameDao;

    @Override
    public List<ReviewsWithUsername> findAll() {
        return reviewsWithUsernameDao.findAll();
    }

    @Override
    public List<ReviewsWithUsername> findByUserId(int userId) {
        return reviewsWithUsernameDao.findAll();
    }

    @Override
    public List<ReviewsWithUsername> findByProductId(int productId) {
        return reviewsWithUsernameDao.findByProductId(productId);
    }
}
