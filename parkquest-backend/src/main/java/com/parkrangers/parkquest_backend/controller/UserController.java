package com.parkrangers.parkquest_backend.controller;

import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    //    update profile information
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> payload) {
        try {
            // Debugging: Log the received payload
            System.out.println("Received Payload: " + payload);

            Long userId = Long.valueOf(payload.get("userId"));

            System.out.println("Extracted userId: " + userId);

            String email = payload.get("email");
            String currentPassword = payload.get("currentPassword");
            String newPassword = payload.get("newPassword");
            String role = Boolean.parseBoolean(payload.get("isAdmin")) ? "ROLE_ADMIN" : "ROLE_USER";

            // Log extracted values
            System.out.println("Email: " + email);
            System.out.println("Role: " + role);

            User updatedUser = userService.updateProfileWithRole(userId, email, currentPassword, newPassword, role);

            System.out.println("Updated User: " + updatedUser);

            return ResponseEntity.ok(Map.of("message", "Profile updated successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage())); // Handle user errors
        } catch (IllegalStateException e) {
            return ResponseEntity.status(500).body(Map.of("message", e.getMessage())); // Handle server errors
        } catch (Exception e) {
            // Catch any unforeseen errors
            System.err.println("Unknown Exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Internal server error: " + e.getMessage()));
        }
    }

    //fetches all users must be an admin to use
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam Long adminId) {
        return userService.isAdmin(adminId)
                ? ResponseEntity.ok(userService.getAllUsers())
                : ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");
    }

    //as an admin can update the role of another user
    @PutMapping("/update-role")
    public ResponseEntity<String> updateRole(@RequestBody Map<String, String> payload) {
        try {
            Long adminId = Long.parseLong(payload.get("adminId"));
            Long targetUserId = Long.parseLong(payload.get("userId"));
            boolean isAdmin = Boolean.parseBoolean(payload.get("isAdmin"));

            if (!userService.isAdmin(adminId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can change roles.");
            }

            userService.setAdminRole(targetUserId, isAdmin);
            return ResponseEntity.ok("User role updated.");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid input: ID must be a number.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }

    //as an admin can delete another user
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long userId,
            @RequestParam Long adminId) {

        if (!userService.isAdmin(adminId)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only admins can delete users.");
        }

        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted.");
    }


}