package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.models.entity.ParkReview;
import com.parkrangers.parkquest_backend.repositories.ParkReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkReviewService {

    private final ParkReviewRepository parkReviewRepository;

    public ParkReviewService(ParkReviewRepository parkReviewRepository) {
        this.parkReviewRepository = parkReviewRepository;
    }

    // Add a new review
    public ParkReview addReview(ParkReview review) {
        return parkReviewRepository.save(review);
    }

    // Get all reviews for a specific park by parkId
    public List<ParkReview> getReviewsByPark(String parkId) {
        return parkReviewRepository.findByParkId(parkId);
    }

    // Get a review by its reviewId
    public ParkReview getReviewById(Long reviewId) {
        return parkReviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    // Update an existing review
    public ParkReview updateReview(ParkReview review) {
        return parkReviewRepository.save(review);
    }

    // Delete a review by its reviewId
    public void deleteReview(Long reviewId) {
        parkReviewRepository.deleteById(reviewId);
    }
}
