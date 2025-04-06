package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.Role;
import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.repository.RoleRepository;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public User loginUser(String email, String password) {
        // Find existing user by email
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            throw new IllegalArgumentException("User with the given email does not exist.");
        }

        User user = existingUser.get();

        // Validate the given password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        // Return the logged-in user's details
        return user;
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

        // Assign default role
        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole == null) {
            throw new IllegalStateException("Default role not found. Please seed roles in the database.");
        }
        newUser.setRoles(Set.of(userRole));

        return userRepository.save(newUser);
    }
}