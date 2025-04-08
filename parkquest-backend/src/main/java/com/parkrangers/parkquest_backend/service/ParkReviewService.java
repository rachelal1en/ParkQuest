package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.ParkReview;
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

    //Method to delete a park review
    public void deleteReview(Long userId, String parkCode) {
        parkReviewRepository.findByUserIdAndParkCode(userId, parkCode)
                .ifPresent(parkReviewRepository::delete);
    }

    // Method to edit an existing park review (only the review owner can edit it)
    public ParkReview editReview (Long userId, String parkCode, String content, int rating) {
        Optional<ParkReview> existingReview = parkReviewRepository.findByUserIdAndParkCode(userId, parkCode);
        if (existingReview.isEmpty()) {
            return null;
        }
        try {
            ParkReview review = existingReview.get();
            review.setContent(content);
            review.setRating(rating);
            return parkReviewRepository.save(review);
        } catch (SecurityException e) {
            throw new SecurityException("User does not have permission to edit this review");
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Review not found");
        }

    }


}
