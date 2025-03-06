package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.dao.UserDao;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findById(int id) {
        return userDao.findById(id);
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }
    @Override
    public void deleteById(int id) {
        User user = userDao.findById(id);
        userDao.deleteById(user);
    }

    @Override
    public Address saveAddress(Address address) {
        return userDao.saveAddress(address);
    }

    @Override
    public Address findAddressByUserId(int userId) {
        return userDao.findAddressByUserId(userId);
    }


}
