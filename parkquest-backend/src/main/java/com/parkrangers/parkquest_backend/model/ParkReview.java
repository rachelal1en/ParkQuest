package com.parkrangers.parkquest_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "park_reviews")
public class ParkReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "user_id", nullable = false) // userId as a field
    private Long userId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name="rating", nullable = false)
    private int rating;         // Rating out of 5

    @Column (name="parkcode", nullable = false)
    private String parkCode;      // parkCode as a simple string (not linked to the Park entity)

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getParkCode() {
        return parkCode;
    }

    public void setParkCode(String parkCode) {
        this.parkCode = parkCode;
    }
}
