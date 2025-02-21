package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.req.ChatRequest;
import com.AIWebshop.AIWebshop.service.ChatService;
import com.AIWebshop.AIWebshop.service.GeminiService;
import com.AIWebshop.AIWebshop.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class GeminiChatController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/geminiMessage")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER')")
    public ResponseEntity<String> sendMessage(@RequestBody ChatRequest chatRequest, Principal principal) {
        try {
            String username = principal.getName();

            int userId = userService.findByUsername(username).getId();

            Chat newChat = new Chat();
            newChat.setQuestion(chatRequest.getQuestion());

            String response = geminiService.generateResponse(chatRequest.getQuestion());

            newChat.setMessage(response);
            newChat.setUserId(userId);

            if (response != null){
                chatService.save(newChat);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error communicating with Gemini API: " + e.getMessage());
        }
    }

    @GetMapping("/geminiMessage/{userId}")
public List<Map<String, String>> findByUserId(@PathVariable int userId) {
    List<Chat> theList = chatService.findByUserId(userId);

    List<Map<String, String>> messages = theList.stream()
            .map(chat -> {
                Map<String, String> map = new HashMap<>();
                map.put("message", chat.getMessage());
                map.put("question", chat.getQuestion());
                return map;
            })
            .toList();
    return messages;
}

    @GetMapping("/geminiQuestion/{userId}")
    public List<String> findQuestionByUserId(@PathVariable int userId) {
        List<Chat> theList = chatService.findByUserId(userId);

        List<String> messages = theList.stream().map(Chat::getQuestion).toList();
        return messages;
    }
}