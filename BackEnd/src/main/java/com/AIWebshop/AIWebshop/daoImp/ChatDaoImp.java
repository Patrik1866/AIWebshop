package com.AIWebshop.AIWebshop.daoImp;

import com.AIWebshop.AIWebshop.dao.ChatDao;
import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatDaoImp implements ChatDao {

    @Autowired
    private EntityManager entityManager;
    @Override
    @Transactional
    public Chat save(Chat chat) {
        User user = entityManager.find(User.class, chat.getUserId());
        chat.setUserId(user.getId());
        Chat savedChat = entityManager.merge(chat);

        return savedChat;
    }

    @Override
    public List<Chat> findAll() {
        TypedQuery theQuerry = entityManager.createQuery("FROM Chat", Chat.class);

        List<Chat> results = theQuerry.getResultList();
        return results;
    }

    @Override
    public List<Chat> findByUserId(int userId) {
        TypedQuery theQuerry = entityManager.createQuery("FROM Chat WHERE userId = :userId", Chat.class);
        theQuerry.setParameter("userId", userId);
        List<Chat> results = theQuerry.getResultList();

        return results;
    }

    @Override
    public User findById(int id) {
        User theUser = entityManager.find(User.class, id);

        return theUser;
    }
}
