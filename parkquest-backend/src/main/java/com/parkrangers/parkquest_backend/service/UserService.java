package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.models.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {

            User user = (User) authentication.getPrincipal();
            return user;
        } else {

            throw new RuntimeException("No authenticated user found");
        }
    }


    }

