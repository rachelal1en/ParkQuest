//package com.parkrangers.parkquest_backend.services;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.parkrangers.parkquest_backend.models.response.Park;
//import com.parkrangers.parkquest_backend.repositories.ParkRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class ParkService {
//
//    private static final String API_BASE_URL = "https://developer.nps.gov/api/v1/parks";
//    private static final String API_KEY = "psiKQ0pcuRwnHB779eAfD9G0Ihuf7iyqD0QejP79";
//
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final ParkRepository parkRepository;
//
//    @Autowired
//    public ParkService(ParkRepository parkRepository) {
//        this.parkRepository = parkRepository;
//    }
//
//    public JsonNode fetchParksByState(String stateCode) {
//        String url = API_BASE_URL + "?stateCode=" + stateCode + "&api_key=" + API_KEY;
//        return restTemplate.getForObject(url, JsonNode.class);
//    }
//
//    public void saveFavoritePark(JsonNode parkNode) {
//        if (parkNode != null) {
//            Park park = new Park();
//
//            park.setName(parkNode.has("fullName") ? parkNode.get("fullName").asText() : "Unknown Name");
//            park.setUrl(parkNode.has("url") ? parkNode.get("url").asText() : "No URL");
//
//            List<String> activities = new ArrayList<>();
//            if (parkNode.has("activities")) {
//                for (JsonNode activity : parkNode.get("activities")) {
//                    activities.add(activity.get("name").asText());
//                }
//            }
//            park.setActivities(activities);
//
//
//            if (parkNode.has("images") && parkNode.get("images").isArray() && parkNode.get("images").size() > 0) {
//                park.setImageUrl(parkNode.get("images").get(0).get("url").asText());
//            } else {
//                park.setImageUrl("No image available");
//            }
//
//            parkRepository.save(park);
//        }
//    }
//}
