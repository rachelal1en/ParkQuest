package com.parkrangers.parkquest_backend.models.response;

import jakarta.persistence.*;

import java.util.List;
import java.util.Map;

@Entity
@Table(name = "favorite_park")
public class Park {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "park_id")
    private Long parkId;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "parkCode")
    private String parkCode;

    @Column(name = "description")
    private String description;

    @Column(name = "url")
    private String url;

//    @Column(name = "image_url")
//    private String imageUrl;
//
//    @ElementCollection
//    @CollectionTable(name = "park_activities", joinColumns = @JoinColumn(name = "park_id"))
//    @Column(name = "activity")
//    private List<String> activities;


    public Park() {
    }

    public Long getParkId() {
        return parkId;
    }

    public void setParkId(Long parkId) {
        this.parkId = parkId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getParkCode() {
        return parkCode;
    }

    public void setParkCode(String parkCode) {
        this.parkCode = parkCode;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

//    public List<String> getActivities() {
//        return activities;
//    }
//
//    public void setActivities(List<String> activities) {
//        this.activities = activities;
//    }
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }

}