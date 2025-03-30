 park-activities
package com.parkrangers.parkquest_backend.repository;

import com.parkrangers.parkquest_backend.model.response.Park;

package com.parkrangers.parkquest_backend.repositories;

import com.parkrangers.parkquest_backend.models.response.Park;
 main
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripPlanRepository extends JpaRepository<Park, Long> {
}
