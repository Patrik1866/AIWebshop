package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.ReviewDao;
import com.AIWebshop.AIWebshop.entity.Reviews;
import com.AIWebshop.AIWebshop.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImp implements ReviewService {

    @Autowired
    private ReviewDao reviewDao;
    @Override
    public List<Reviews> findAll() {
        return reviewDao.findAll();
    }

    @Override
    public Reviews findById(int id) {
        return reviewDao.findById(id);
    }

    @Override
    public List<Reviews> findByUserId(int userId) {
        return reviewDao.findByUserId(userId);
    }

    @Override
    public List<Reviews> findByProductId(int productId) {
        return reviewDao.findByProductId(productId);
    }

    @Override
    public void deleteById(int id) {
        Reviews theReview = reviewDao.findById(id);

        reviewDao.deleteById(theReview);
    }
}
