package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.CartDao;
import com.AIWebshop.AIWebshop.dao.UserDao;
import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImp implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Override
    public List<Cart> findAll() {
        return cartDao.findAll();
    }

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

    @Override
    public Cart saveCart(Cart cart) {

        return cartDao.saveCart(cart);
    }
}
