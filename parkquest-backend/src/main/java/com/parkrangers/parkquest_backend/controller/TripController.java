package com.parkrangers.parkquest_backend.controller;

import com.parkrangers.parkquest_backend.model.User;
import com.parkrangers.parkquest_backend.model.response.Park;
import com.parkrangers.parkquest_backend.model.response.Trip;
import com.parkrangers.parkquest_backend.repository.TripRepository;
import com.parkrangers.parkquest_backend.repository.UserRepository;
import com.parkrangers.parkquest_backend.repository.ParkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkRepository parkRepository;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        Optional<Trip> trip = tripRepository.findById(id);
        return trip.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        // Log the incoming trip object
        System.out.println("Received trip data: " + trip);

        Optional<User> user = userRepository.findById(trip.getUser().getId());
        Optional<Park> park = parkRepository.findById(trip.getPark().getParkId());

        if (user.isEmpty() || park.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        trip.setUser(user.get());
        trip.setPark(park.get());

        Trip savedTrip = tripRepository.save(trip);
        return ResponseEntity.ok(savedTrip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip tripDetails) {
        Optional<Trip> optionalTrip = tripRepository.findById(id);
        if (optionalTrip.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Trip trip = optionalTrip.get();
        trip.setTitle(tripDetails.getTitle());
        trip.setDescription(tripDetails.getDescription());
        trip.setStartDate(tripDetails.getStartDate());
        trip.setEndDate(tripDetails.getEndDate());
        trip.setUser(tripDetails.getUser());
        trip.setPark(tripDetails.getPark());

        Trip updatedTrip = tripRepository.save(trip);
        return ResponseEntity.ok(updatedTrip);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        if (!tripRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        tripRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
