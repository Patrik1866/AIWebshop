package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.CartViewDao;
import com.AIWebshop.AIWebshop.entity.CartView;
import com.AIWebshop.AIWebshop.service.CartViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartViewServiceImp implements CartViewService {

    @Autowired
    private CartViewDao cartViewDao;
    @Override
    public List<CartView> findByUserId(int userId) {
        return cartViewDao.findByUserId(userId);
    }
}
