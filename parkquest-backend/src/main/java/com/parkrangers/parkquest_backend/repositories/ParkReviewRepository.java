package com.parkrangers.parkquest_backend.repositories;

import com.parkrangers.parkquest_backend.models.entity.ParkReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkReviewRepository extends JpaRepository<ParkReview, Long> {
    List<ParkReview> findByParkId(String parkId);  // Find reviews by parkId
}
