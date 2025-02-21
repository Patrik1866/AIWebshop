package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.ChatDao;
import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImp implements ChatService {

    @Autowired
    private ChatDao chatDao;

    @Override
    public Chat save(Chat chat) {
        return chatDao.save(chat);
    }

    @Override
    public List<Chat> findAll() {
        return chatDao.findAll();
    }

    @Override
    public List<Chat> findByUserId(int userId) {
        return chatDao.findByUserId(userId);
    }
}
