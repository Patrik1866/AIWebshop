package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    List<User> findAll();
    User findById(int id);
    User findByUsername(String username);
    User save(User user);
    void deleteById(int id);
    Address saveAddress(Address address);
    Address findAddressByUserId(int userId);
}
