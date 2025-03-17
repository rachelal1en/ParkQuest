package com.parkrangers.parkquest_backend.repositories;

import com.parkrangers.parkquest_backend.models.Park;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPlanRepository extends JpaRepository<Park, Long> {
}
