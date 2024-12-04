package com.AIWebshop.AIWebshop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

@Service
public class GeminiService {

    private final String apiKey;

    public GeminiService(){
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("GEMINI_API_KEY");
        if (apiKey == null) {
            throw new RuntimeException("OpenAI API token not found in environment variable");
        }
    }

    private final String API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    public String generateResponse(String prompt) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(API_BASE_URL + "?key=" + apiKey);
            request.setHeader("Content-Type", "application/json");

            String json = "{\"contents\":[{\"parts\":[{\"text\":\"" + prompt + "\"}]}]}";

            StringEntity entity = new StringEntity(json);
            request.setEntity(entity);

            CloseableHttpResponse response = httpClient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(responseBody);

            if (rootNode.has("candidates") && rootNode.get("candidates").isArray() &&
                    rootNode.get("candidates").size() > 0) {
                return rootNode.get("candidates").get(0)
                        .get("content")
                        .get("parts").get(0)
                        .get("text").asText();
            } else {
                throw new RuntimeException("Unexpected API response format: " + responseBody);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with Gemini API: " + e.getMessage(), e);
        }
    }
}