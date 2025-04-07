package com.parkrangers.parkquest_backend.controller;
import com.parkrangers.parkquest_backend.model.Favorite;
import com.parkrangers.parkquest_backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{userId}")
    public List<Favorite> getUserFavorites(@PathVariable Long userId) {
        return favoriteService.getFavoritesByUser(userId);
    }

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(
            @RequestParam Long userId,
            @RequestParam String parkCode,
            @RequestParam String fullName
    ){
        Favorite favorite = favoriteService.addFavorite(userId, parkCode, fullName);
        return ResponseEntity.ok(favorite); // Return success
    }
//    {
//        try {
//            Favorite favorite = favoriteService.addFavorite(userId, parkCode, fullName);
//            return ResponseEntity.ok(favorite); // Return success
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage()); // Return 400 for user not found
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(409).body(e.getMessage()); // Return 409 for duplicate favorite
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An unexpected error occurred"); // Generic error
//        }
//    }



@DeleteMapping
    public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam String parkCode) {
        favoriteService.deleteFavorite(userId, parkCode);
        return ResponseEntity.ok().build();
    }


}
