package com.AIWebshop.AIWebshop.serviceImp;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

@Service
public class OpenAIService {

    private final String API_TOKEN;
    private final String API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

    public OpenAIService(){
        Dotenv dotenv = Dotenv.load();
        this.API_TOKEN = dotenv.get("API_TOKEN_HUGGIN");
        if (API_TOKEN == null) {
            throw new RuntimeException("OpenAI API token not found in environment variable");
        }

    }

    public String generateResponse(String prompt) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(API_URL);
            request.setHeader("Authorization", "Bearer " + API_TOKEN);
            request.setHeader("Content-Type", "application/json");

            String json = "{\"inputs\": \"" + prompt + "\"}";

            StringEntity entity = new StringEntity(json);
            request.setEntity(entity);

            CloseableHttpResponse response = httpClient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(responseBody);

            if (rootNode.isArray() && rootNode.size() > 0) {
                return rootNode.get(0).get("generated_text").asText();
            } else {
                throw new RuntimeException("Unexpected API response format: " + responseBody);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with OpenAI API: " + e.getMessage(), e);
        }
    }
}