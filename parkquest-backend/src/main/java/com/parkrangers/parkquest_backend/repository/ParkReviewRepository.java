package com.parkrangers.parkquest_backend.repository;

import com.parkrangers.parkquest_backend.model.ParkReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkReviewRepository extends JpaRepository<ParkReview, Long> {
    List<ParkReview> findByParkCode(String parkCode);
    Optional<ParkReview> findByUserIdAndParkCode(Long userId, String parkCode); //find review by userId and parkCode
}
