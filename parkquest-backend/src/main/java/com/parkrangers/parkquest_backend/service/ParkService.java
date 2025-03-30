package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.response.Activity;
import com.parkrangers.parkquest_backend.model.response.Park;
import com.parkrangers.parkquest_backend.model.response.Image;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParkService {
    public Park parseParkFromJson(JSONObject parkJson) throws JSONException {
        Park park = new Park();
        park.setFullName(parkJson.getString("fullName"));
        park.setParkCode(parkJson.getString("parkCode"));
        park.setDescription(parkJson.getString("description"));
        park.setUrl(parkJson.getString("url"));

        // Extract images
        if (parkJson.has("images")) {
            JSONArray imagesArray = parkJson.getJSONArray("images");
            List<Image> images = new ArrayList<>();

            for (int i = 0; i < imagesArray.length(); i++) {
                JSONObject imgJson = imagesArray.getJSONObject(i);
                Image image = new Image();
                image.setUrl(imgJson.getString("url"));
                image.setTitle(imgJson.optString("title", "")); // Optional

                images.add(image);
            }

            park.setImages(images);
        }

        if (parkJson.has("activities")) {
            JSONArray activitiesArray = parkJson.getJSONArray("activities");
            List<Activity> activities = new ArrayList<>();
            for (int i = 0; i < activitiesArray.length(); i++) {
                JSONObject activityJson = activitiesArray.getJSONObject(i);
                Activity activity = new Activity();
                activity.setId(activityJson.getString("id"));
                activity.setName(activityJson.getString("name"));
                activity.setUrl(activityJson.optString("url", ""));  // Use `optString` to avoid missing URL errors
                activities.add(activity);
            }
            park.setActivities(activities);
        }

        return park;
    }
}