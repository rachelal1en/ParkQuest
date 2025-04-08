//package com.parkrangers.parkquest_backend.service;
//
//import com.parkrangers.parkquest_backend.model.response.Trip;
//import com.parkrangers.parkquest_backend.repository.ParkRepository;
//import com.parkrangers.parkquest_backend.repository.TripRepository;
//import com.parkrangers.parkquest_backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TripService {
//
//    @Autowired
//    private TripRepository tripRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ParkRepository parkRepository;
//
//    // Create a new trip
//    public Trip saveTrip(Trip trip) {
//        Optional<User> user = userRepository.findById(trip.getUser().getUserId());
//        Optional<Park> park = parkRepository.findById(trip.getPark().getParkId());
//
//        if (user.isEmpty() || park.isEmpty()) {
//            return null;  // Return null if User or Park is not found
//        }
//
//        trip.setUser(user.get());
//        trip.setPark(park.get());
//
//        return tripRepository.save(trip);
//    }
//
//    // Update a trip
//    public Trip updateTrip(Long id, Trip tripDetails) {
//        Optional<Trip> optionalTrip = tripRepository.findById(id);
//        if (optionalTrip.isEmpty()) {
//            return null;
//        }
//
//        Trip trip = optionalTrip.get();
//        trip.setTitle(tripDetails.getTitle());
//        trip.setDescription(tripDetails.getDescription());
//        trip.setStartDate(tripDetails.getStartDate());
//        trip.setEndDate(tripDetails.getEndDate());
//        trip.setUser(tripDetails.getUser());
//        trip.setPark(tripDetails.getPark());
//
//        return tripRepository.save(trip);
//    }
//
//    // Delete a trip
//    public boolean deleteTrip(Long id) {
//        if (!tripRepository.existsById(id)) {
//            return false;
//        }
//
//        tripRepository.deleteById(id);
//        return true;
//    }
//
//    // Get all trips for a user
//    public List<Trip> getTripsByUserId(Long userId) {
//        return tripRepository.findByUserId(userId);
//    }
//}