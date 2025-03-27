package com.parkrangers.parkquest_backend.services;

import com.parkrangers.parkquest_backend.models.response.Park;
import com.parkrangers.parkquest_backend.models.response.ParkSearchResponse;
import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;


@Service
public class ParkSearchService {

    @Value("${api.key}")
    private String apiKey;

    private final String API_URL = "https://developer.nps.gov/api/v1/parks";

    public List<Park> getParks(String stateCode) throws JSONException {
        String url = String.format("%s?stateCode=%s&limit=100&api_key=%s",
                API_URL, stateCode, apiKey);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ParkSearchResponse> response = restTemplate.getForEntity(url, ParkSearchResponse.class);

        return response.getBody().getData();
    }
}
