package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();
    User findById(int id);
    User findByUsername(String username);
    User save(User user);
    User deleteById(User user);
    Address saveAddress(Address address);
    Address findAddressByUserId(int userId);
}

