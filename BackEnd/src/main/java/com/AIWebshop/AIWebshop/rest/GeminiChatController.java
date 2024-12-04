package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.req.ChatRequest;
import com.AIWebshop.AIWebshop.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class GeminiChatController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/geminiMessage")
    public ResponseEntity<String> sendMessage(@RequestBody ChatRequest chatRequest) {
        try {
            String response = geminiService.generateResponse(chatRequest.getMessage());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error communicating with Gemini API: " + e.getMessage());
        }
    }
}