package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.models.dto.ImageDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParkService {

    @Value("${api.key}")
    private String apiKey;

    private final String API_URL = "https://developer.nps.gov/api/v1/parks";

    public List<ImageDTO> getParkImages(String parkCode) {
        String url = String.format("%s?parkCode=%s&api_key=%s", API_URL, parkCode, apiKey);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        List<ImageDTO> images = new ArrayList<>();

        if (response.getStatusCode().is2xxSuccessful()) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray parksArray = jsonResponse.optJSONArray("data");

            if (parksArray != null && parksArray.length() > 0) {
                JSONObject parkJson = parksArray.getJSONObject(0);

                JSONArray imagesArray = parkJson.optJSONArray("images");

                if (imagesArray != null) {
                    for (int j = 0; j < imagesArray.length(); j++) {
                        JSONObject imgJson = imagesArray.getJSONObject(j);

                        ImageDTO imageDTO = new ImageDTO(
                                imgJson.optString("url"),
                                imgJson.optString("altText"),
                                imgJson.optString("title")
                        );
                        images.add(imageDTO);
                    }
                }
            }
        }

        return images;
    }
}