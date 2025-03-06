package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.UserWithAddressDao;
import com.AIWebshop.AIWebshop.entity.UsersWithAddress;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class UserWithAddressDaoImp implements UserWithAddressDao {

    @Autowired
    private EntityManager entityManager;

    @Override
    public UsersWithAddress findUserWithAddressByUserId(int userId) {
        TypedQuery theQuery = entityManager.createQuery("FROM UsersWithAddress WHERE userId = :userId", UsersWithAddress.class);
        theQuery.setParameter("userId", userId);
        return (UsersWithAddress) theQuery.getSingleResult();
    }
}
