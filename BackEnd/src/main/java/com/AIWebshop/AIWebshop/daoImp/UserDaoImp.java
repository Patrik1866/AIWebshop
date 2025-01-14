package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.UserDao;
import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImp implements UserDao {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<User> findAll() {
        TypedQuery<User> theQuerry = entityManager.createQuery("FROM User", User.class);

        List<User> users = theQuerry.getResultList();

        return users;
    }

    @Override
    public User findById(int id) {
        User user = entityManager.find(User.class, id);

        return user;
    }

    @Override
    public User findByUsername(String username) {
        try {
            TypedQuery<User> theQuerry = entityManager.createQuery("FROM User where username = :username", User.class);
            theQuerry.setParameter("username", username);
            return theQuerry.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }


    @Override
    @Transactional
    public User save(User user) {
        User dbUser = entityManager.merge(user);

        return dbUser;
    }

    @Override
    @Transactional
    public User deleteById(User user) {
        entityManager.remove(user);

        return null;
    }

    @Override
    @Transactional
    public Address saveAddress(Address address) {
        Address dbaddress = entityManager.merge(address);

        return dbaddress;
    }


}
