package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.entity.User;

import java.util.List;

public interface ChatDao {
    Chat save(Chat chat);
    List<Chat> findAll();
    List<Chat> findByUserId(int userId);
    User findById(int id);
}
