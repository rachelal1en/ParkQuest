package com.parkrangers.parkquest_backend.model.response;
public class Event {
    private String title;
    private String description;
    private String parkCode;
    private String date;

    // Getters and setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getParkCode() { return parkCode; }
    public void setParkCode(String parkCode) { this.parkCode = parkCode; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}