package com.parkrangers.parkquest_backend.service;

import com.parkrangers.parkquest_backend.model.Favorite;
import com.parkrangers.parkquest_backend.repository.FavoriteRepository;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Favorite> getFavoritesByUser(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public Favorite addFavorite(Long userId, String parkCode, String fullName, String parkDescription) {
        if (favoriteRepository.findByUserIdAndParkCode(userId, parkCode).isPresent()) {
            throw new RuntimeException("Favorite already exists");
        }

        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setParkCode(parkCode);
        favorite.setFullName(fullName);
        favorite.setParkDescription(parkDescription);
        return favoriteRepository.save(favorite);
    }

    public void deleteFavorite(Long userId, String parkCode) {
        favoriteRepository.findByUserIdAndParkCode(userId, parkCode)
                .ifPresent(favoriteRepository::delete);
    }
}
