package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.models.response.ParkSearchResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;


@Service
public class ParkSearchService {

    @Value("${api.key}")
    private String apiKey;

    private final String API_URL = "https://developer.nps.gov/api/v1/parks";

    public List<com.parkrangers.parkquest_backend.models.response.Park> getParks(String stateCode, String parkCode) {
        String url = String.format("%s?stateCode=%s&parkCode=%s&limit=15&start=12&q=%s&api_key=%s",
                API_URL, stateCode, parkCode, parkCode, apiKey);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ParkSearchResponse> response = restTemplate.getForEntity(url, ParkSearchResponse.class);

        return response.getBody().getData();
    }
}
