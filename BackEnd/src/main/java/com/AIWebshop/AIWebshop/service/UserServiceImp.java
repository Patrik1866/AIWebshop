package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findById(int id) {
        return userDao.findById(id);
    }

    @Override
    public User save(User user) {
        if (user.getAddresses() != null) {
            user.getAddresses().forEach(address -> address.setUser(user));
        }

        return userDao.save(user);
    }

    @Override
    public void deleteById(int id) {
        User user = userDao.findById(id);
        userDao.deleteById(user);
    }

    @Override
    public User createUserWithAddress(User user) {
        user.getAddresses().forEach(address -> address.setUser(user));

        return userDao.save(user);
    }

}
