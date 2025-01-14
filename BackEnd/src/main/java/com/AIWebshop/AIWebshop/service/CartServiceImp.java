package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.dao.CartDao;
import com.AIWebshop.AIWebshop.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartDao cartDao;

    @Override
    public Cart findById(int id) {
        return cartDao.findById(id);
    }

    @Override
    public List<Cart> findByUserId(int id) {
        return cartDao.findByUserId(id);
    }

    @Override
    public void deleteById(int id) {
        Cart theCart = cartDao.findById(id);
        cartDao.deleteById(theCart);
    }
}
