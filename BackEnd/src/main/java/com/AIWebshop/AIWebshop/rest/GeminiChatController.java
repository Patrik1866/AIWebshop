package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Chat;
import com.AIWebshop.AIWebshop.req.ChatRequest;
import com.AIWebshop.AIWebshop.service.ChatService;
import com.AIWebshop.AIWebshop.serviceImp.GeminiService;
import com.AIWebshop.AIWebshop.service.UserService;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(GeminiChatController.class);
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

            String response = geminiService.generateResponse(chatRequest.getQuestion());

            boolean isProductResponse = false;
            if (response != null && response.trim().startsWith("[") && response.trim().endsWith("]")) {
                JsonParser parser = new JsonParser();
                JsonElement jsonElement = parser.parse(response);
                if (jsonElement.isJsonArray()) {
                    JsonArray array = jsonElement.getAsJsonArray();
                    if (array.size() > 0 && array.get(0).getAsJsonObject().has("name")) {
                        isProductResponse = true;
                    }
                }
            } else {
                isProductResponse = false;
            }


            if (response != null && !isProductResponse) {
                Chat newChat = new Chat();
                newChat.setQuestion(chatRequest.getQuestion());
                newChat.setMessage(response);
                newChat.setUserId(userId);
                chatService.save(newChat);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.info(e.getMessage());
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