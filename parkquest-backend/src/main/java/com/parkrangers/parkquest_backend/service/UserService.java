package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.Role;
import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.repository.RoleRepository;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public User loginUser(String email, String password) {
        // Check if the user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        // Match the provided password with the encoded password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        return user;
    }

    @Transactional
    public User registerUser(String email, String username, String password, String roleName) {
        // Validate if email or username is already in use
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already registered.");
        }
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username is already taken.");
        }

        // Fetch the associated role (default is ROLE_USER)
        Role userRole = roleRepository.findByName(roleName);

        // Create and save the new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));

        // Add roles to the new user
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        newUser.setRoles(roles);

        return userRepository.save(newUser);
    }


    @Transactional
    public User updateProfileWithRole(Long userId, String email, String currentPassword, String newPassword, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Incorrect current password.");
        }

        // Update fields
        if (email != null && !email.isEmpty()) {
            if (userRepository.existsByEmail(email) && !user.getEmail().equals(email)) {
                throw new RuntimeException("Email is already in use.");
            }
            user.setEmail(email);
        }
        if (newPassword != null && !newPassword.isEmpty()) {
            user.setPassword(passwordEncoder.encode(newPassword));
        }
        if (roleName != null) {
            Role newRole = roleRepository.findByName(roleName);
            Set<Role> roles = new HashSet<>();
            roles.add(newRole);
            user.setRoles(roles);
        }

        return userRepository.save(user);
    }


    public boolean isAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        return user.getRoles().stream()
                .anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @Transactional
    public void setAdminRole(Long targetUserId, boolean isAdmin) {
        try {
            // Fetch the target user
            User user = userRepository.findById(targetUserId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + targetUserId));

            // Log current roles for debugging
            System.out.println("Current roles of user " + targetUserId + ": " + user.getRoles());

            // Fetch the role based on isAdmin flag
            String roleName = isAdmin ? "ROLE_ADMIN" : "ROLE_USER";
            Role role = roleRepository.findByName(roleName);

            // Update roles while preserving existing relationships
            Set<Role> roles = new HashSet<>(user.getRoles());
            roles.removeIf(r -> r.getName().startsWith("ROLE_")); // Remove existing ROLE_
            roles.add(role); // Add the new role

            user.setRoles(roles);

            // Save updated user
            userRepository.save(user);
            System.out.println("Roles updated for user " + targetUserId + ": " + user.getRoles());
        } catch (Exception e) {
            System.err.println("Error updating roles for user " + targetUserId + ": " + e.getMessage());
            e.printStackTrace();
            throw e; // Re-throw exception to ensure it's logged and handled
        }
    }


    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        userRepository.delete(user);
    }
}