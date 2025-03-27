package com.parkrangers.parkquest_backend.models.response;

import jakarta.persistence.*;

@Entity
@Table(name = "favorite_park")
public class Park {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "park_id")
    private Long parkId;

    @Column(name = "full_name")  // Save only basic info
    private String fullName;

    @Column(name = "description")
    private String description;

    @Column(name = "url")
    private String url;

    public Park() {}

    public Park(String fullName, String description, String url) {
        this.fullName = fullName;
        this.description = description;
        this.url = url;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
