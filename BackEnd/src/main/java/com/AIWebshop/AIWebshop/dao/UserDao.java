package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.User;
import groovy.lang.GString;

import java.util.List;

public interface UserDao {
    List<User> findAll();
    User findById(int id);
    User save(User user);
    User deleteById(User user);
    List<User> findByEmail(String email);
}
