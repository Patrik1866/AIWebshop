package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.UsersWithAddress;


public interface UserWithAddressDao {
    UsersWithAddress findUserWithAddressByUserId(int userId);
}
