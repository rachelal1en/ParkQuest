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


    public ParkReview addReview(ParkReview review) {
        return parkReviewRepository.save(review);
    }


    public List<ParkReview> getReviewsByPark(String parkId) {
        return parkReviewRepository.findByParkId(parkId);
    }


    public ParkReview getReviewById(Long reviewId) {
        return parkReviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
    }


    public ParkReview updateReview(ParkReview review) {
        return parkReviewRepository.save(review);
    }


    public void deleteReview(Long reviewId) {
        parkReviewRepository.deleteById(reviewId);
    }
}
