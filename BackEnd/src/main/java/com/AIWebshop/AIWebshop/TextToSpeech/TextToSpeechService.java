package com.AIWebshop.AIWebshop.TextToSpeech;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TextToSpeechService {
    private final String apiKey;
    private final RestTemplate restTemplate;

    public TextToSpeechService() {
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("TTS_API_KEY");
        if (apiKey == null) {
            throw new RuntimeException("VoiceRSS API key not found in environment variable");
        }
        this.restTemplate = new RestTemplate();
    }

    public byte[] generateSpeech(String text, String languageCode) {
        try {
            String encodedText = encodeURIComponent(text);
            String url = String.format("http://api.voicerss.org/?key=%s&hl=%s&src=%s&c=MP3&r=-2&f=44khz_16bit_stereo",
                    apiKey, languageCode ,encodedText);

            byte[] audioData = restTemplate.getForObject(url, byte[].class);

            return audioData;
        } catch (Exception e) {
            throw new RuntimeException("Error generating speech: " + e.getMessage(), e);
        }
    }

    private String encodeURIComponent(String s) {
        String result;

        try {
            result = URLEncoder.encode(s, StandardCharsets.UTF_8.toString())
                    .replaceAll("\\%21", "!")
                    .replaceAll("\\%27", "'")
                    .replaceAll("\\%28", "(")
                    .replaceAll("\\%29", ")")
                    .replaceAll("\\%7E", "~")
                    .replaceAll("%C3%A1", "á")
                    .replaceAll("%C3%A9", "é")
                    .replaceAll("%C3%AD", "í")
                    .replaceAll("%C3%B3", "ó")
                    .replaceAll("%C3%B6", "ö")
                    .replaceAll("%C5%91", "ő")
                    .replaceAll("%C3%BA", "ú")
                    .replaceAll("%C3%BC", "ü")
                    .replaceAll("%C5%B1", "ű")
                    .replaceAll("%C3%81", "Á")
                    .replaceAll("%C3%89", "É")
                    .replaceAll("%C3%8D", "Í")
                    .replaceAll("%C3%93", "Ó")
                    .replaceAll("%C3%96", "Ö")
                    .replaceAll("%C5%90", "Ő")
                    .replaceAll("%C3%9A", "Ú")
                    .replaceAll("%C3%9C", "Ü")
                    .replaceAll("%C5%B0", "Ű");
        } catch (Exception e) {
            result = s;
        }

        return result;
    }
}