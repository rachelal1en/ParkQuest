//package com.parkrangers.parkquest_backend.model.response;
//
//import jakarta.persistence.*;
//
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "my_trips")
//public class Trip {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long tripId;
//
//    private String title;
//    private String description;
//
////    @ManyToOne
////    @JoinColumn
//    @Column(name = "user_id", nullable = false)
//    private Long userId;
//
////    @ManyToOne
////    @JoinColumn
//    @Column(name = "parkCode", nullable = false)
//    private String parkCode;
//
//    private LocalDate startDate;
//    private LocalDate endDate;
//
//    // Constructors, getters, and setters
//    public Trip() {}
//
//    public Trip(Long tripId, String title, String description, Long userId, String parkCode, LocalDate startDate, LocalDate endDate) {
//        this.tripId = tripId;
//        this.title = title;
//        this.description = description;
//        this.userId = userId;
//        this.parkCode = parkCode;
//        this.startDate = startDate;
//        this.endDate = endDate;
//    }
//
//    public Long getTripId() {
//        return tripId;
//    }
//
//    public void setTripId(Long id) {
//        this.tripId = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUser(Long userId) {
//        this.userId = userId;
//    }
//
//    public String getParkCode() {
//        return parkCode;
//    }
//
//    public void setParkCode(String parkCode) {
//        this.parkCode = parkCode;
//    }
//
//    public LocalDate getStartDate() {
//        return startDate;
//    }
//
//    public void setStartDate(LocalDate startDate) {
//        this.startDate = startDate;
//    }
//
//    public LocalDate getEndDate() {
//        return endDate;
//    }
//
//    public void setEndDate(LocalDate endDate) {
//        this.endDate = endDate;
//    }
//}
