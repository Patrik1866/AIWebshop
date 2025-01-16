package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Chat;

import java.util.List;

public interface ChatService {
    Chat save(Chat chat);
    List<Chat> findAll();
    List<Chat> findByUserId(int userId);
}
