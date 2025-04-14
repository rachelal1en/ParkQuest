package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.ParkReview;
import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.repository.ParkReviewRepository;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkReviewService {
    @Autowired
    private ParkReviewRepository parkReviewRepository;

    @Autowired
    private UserRepository userRepository;

    // Method to retrieve all park reviews for a specific park
    public List<ParkReview> getReviewsForPark(String parkCode) {
        return parkReviewRepository.findByParkCode(parkCode);
    }

    // Method to create a new park review
    public ParkReview createReview(Long userId, String parkCode, String content, int rating) {
        ParkReview review = new ParkReview();
        review.setUserId(userId);
        review.setParkCode(parkCode);
        review.setContent(content);
        review.setRating(rating);
        return parkReviewRepository.save(review);
    }

    // Method to edit an existing park review (only the review owner can edit it)
    public ParkReview editReview( Long userId, String parkCode, String content, Long reviewId, int rating) {
        Optional<ParkReview> existingReview = parkReviewRepository.findById(reviewId);

        if (existingReview.isEmpty()) {
            return null;
        }

        ParkReview review = existingReview.get();

        // Check if the current user is the one who created the review
        if (!review.getUserId().equals(userId)) {
            throw new SecurityException("User does not have permission to edit this review");
        }

        // Update review content and rating
        review.setContent(content);
        review.setRating(rating);
        return parkReviewRepository.save(review);
    }

    public boolean deleteReview(Long reviewId, Long userId) {
        ParkReview review = parkReviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getRoleid() == 2);
        boolean isReviewOwner = review.getUserId().equals(userId);

        if (isAdmin || isReviewOwner) {
            parkReviewRepository.delete(review);
            return true;
        }

        throw new RuntimeException("Unauthorized to delete this review");
    }

}