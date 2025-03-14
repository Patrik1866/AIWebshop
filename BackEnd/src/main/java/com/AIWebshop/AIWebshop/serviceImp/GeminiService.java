package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.entity.Product;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GeminiService {
    private final String apiKey;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public GeminiService(){
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("GEMINI_API_KEY");
        if (apiKey == null) {
            throw new RuntimeException("Gemini API key not found in environment variable");
        }
    }

    private final String API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public String generateResponse(String prompt) {
        if (prompt == null) {
            prompt = "Hello";
        }

        String productName = extractProductReference(prompt);
        if (productName != null) {
            return getProductInfo(productName);
        }

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(API_BASE_URL + "?key=" + apiKey);
            request.setHeader("Content-Type", "application/json");

            Map<String, Object> requestBody = new HashMap<>();

            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();

            List<Map<String, Object>> parts = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);

            content.put("parts", parts);

            contents.add(content);

            requestBody.put("contents", contents);

            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(requestBody);

            StringEntity entity = new StringEntity(json);
            request.setEntity(entity);

            CloseableHttpResponse response = httpClient.execute(request);
            String responseBody = EntityUtils.toString(response.getEntity());

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

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

    private String extractProductReference(String text) {
        String[] triggerWords = {"nálatok", "boltban", "webshopban", "webshopon", "webshop"};

        String lowercaseText = text.toLowerCase();

        for (String word : triggerWords) {
            if (lowercaseText.contains(word)) {
                return text;
            }
        }

        return null;
    }

    private String getProductInfo(String searchText) {
        try {
            System.out.println("Keresési szöveg: " + searchText);

            String lowercaseText = searchText.trim().toLowerCase();
            lowercaseText = lowercaseText.replaceAll("[.,!?;:()\\[\\] {}]", " ");
            System.out.println("Előfeldolgozott szöveg: " + lowercaseText);

            List<String> searchTerms = Arrays.stream(lowercaseText.split("\\s+"))
                    .filter(word -> word.length() >= 3)
                    .filter(word -> !isCommonWord(word)) // Feltételezve, hogy van egy ilyen metódus
                    .distinct()
                    .collect(Collectors.toList());

            System.out.println("Keresési kulcsszavak: " + String.join(", ", searchTerms));

            if (searchTerms.isEmpty()) {
                return "Kérem adjon meg több információt a termékről.";
            }

            StringBuilder queryBuilder = new StringBuilder("SELECT * FROM aiwebshop.products WHERE ");
            List<String> conditions = new ArrayList<>();
            List<Object> params = new ArrayList<>();

            for (String term : searchTerms) {
                conditions.add("(LOWER(name) LIKE ? OR LOWER(description) LIKE ?)");
                String searchTerm = "%" + term + "%";
                params.add(searchTerm);
                params.add(searchTerm);
            }

            queryBuilder.append(String.join(" OR ", conditions));
            String sql = queryBuilder.toString();

            System.out.println("Generated Query: " + sql);
            System.out.println("Paraméterek: " + params);

            List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, params.toArray());

            if (results.isEmpty()) {
                return "Üres";
            }

            return new Gson().toJson(results);

        } catch (Exception e) {
            e.printStackTrace();
            return "Hiba történt az adatbázis lekérdezése során: " + e.getMessage();
        }
    }



    private boolean isCommonWord(String word) {
        Set<String> commonWords = new HashSet<>(Arrays.asList(
                "egy", "és", "vagy", "van", "nincs", "the", "and", "or", "is", "are",
                "nem", "igen", "mit", "hogy", "ezt", "azt", "ami", "aki", "hol", "mikor",
                "mennyi", "mennyit", "but", "what", "where", "when", "how", "which", "who"
        ));
        return commonWords.contains(word.toLowerCase());
    }
}