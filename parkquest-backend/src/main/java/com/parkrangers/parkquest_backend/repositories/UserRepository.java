package com.parkrangers.parkquest_backend.repositories;


import com.parkrangers.parkquest_backend.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
