package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.req.ChatRequest;
import com.AIWebshop.AIWebshop.service.ChatService;
import com.AIWebshop.AIWebshop.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/message")
    public ResponseEntity<String> sendMessage(@RequestBody ChatRequest chatRequest) {
        try {
            String response = openAIService.generateResponse(chatRequest.getMessage());




            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error communicating with OpenAI: " + e.getMessage());
        }
    }
}

