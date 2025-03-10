package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.TextToSpeech.TextToSpeechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@RequestMapping("/tts")
public class TextToSpeechController {

    private final TextToSpeechService textToSpeechService;

    @Autowired
    public TextToSpeechController(TextToSpeechService textToSpeechService) {
        this.textToSpeechService = textToSpeechService;
    }



    @PostMapping("/speak")
    public ResponseEntity<byte[]> textToSpeech(@RequestBody String text) {
        try {
            String decodedText = URLDecoder.decode(text, StandardCharsets.UTF_8.toString());
            System.out.println("Received text (decoded): " + decodedText);
            byte[] audioData = textToSpeechService.generateSpeech(decodedText, "hu-hu");
            System.out.println("Generated audio data length: " + audioData.length);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(audioData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}