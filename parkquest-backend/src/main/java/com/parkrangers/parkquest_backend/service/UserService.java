package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerOrLoginUser(String email, String username, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new IllegalArgumentException("Invalid password");
            }
            return user;
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        return userRepository.save(newUser);
    }

    public User registerUser(String email, String username, String password) {
        // Check if email or username already exists
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already taken.");
        }

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        // Register new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        return userRepository.save(newUser);
    }
}