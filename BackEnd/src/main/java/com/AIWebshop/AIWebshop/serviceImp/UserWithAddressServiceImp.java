package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.UserWithAddressDao;
import com.AIWebshop.AIWebshop.entity.UsersWithAddress;
import com.AIWebshop.AIWebshop.service.UserWithAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserWithAddressServiceImp implements UserWithAddressService {

    @Autowired
    private UserWithAddressDao userWithAddressDao;
    @Override
    public UsersWithAddress findUserWithAddressByUserId(int userId) {
        return userWithAddressDao.findUserWithAddressByUserId(userId);
    }
}
