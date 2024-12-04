package com.AIWebshop.AIWebshop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

@Service
public class OpenAIService {

    private final String API_URL = "https://api.openai.com/v1/chat/completions";
    private final String API_TOKEN = "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";

    public String generateResponse(String prompt) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(API_URL);
            request.setHeader("Authorization", "Bearer " + API_TOKEN);
            request.setHeader("Content-Type", "application/json");

            String json = "{\"model\": \"gpt-4\", \"messages\": [{\"role\": \"user\", \"content\": \"" + prompt + "\"}], \"max_tokens\": 100}";

            StringEntity entity = new StringEntity(json);
            request.setEntity(entity);

            CloseableHttpResponse response = httpClient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(responseBody);

            if (rootNode.has("choices") && rootNode.get("choices").isArray() && rootNode.get("choices").size() > 0) {
                return rootNode.get("choices").get(0).get("message").get("content").asText();
            } else if (rootNode.has("error")) {
                throw new RuntimeException("API returned an error: " + rootNode.get("error").get("message").asText());
            } else {
                throw new RuntimeException("Unexpected API response format: " + responseBody);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with OpenAI API: " + e.getMessage(), e);
        }
    }
}