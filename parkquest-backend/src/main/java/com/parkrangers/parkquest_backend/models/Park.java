package com.parkrangers.parkquest_backend.models;

import jakarta.persistence.*;

@Entity
@Table (name = "favorite_park")
public class Park {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "park_id")
    private Long parkId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "state_name")
    private String states;

    public Park() {}

    public Long getParkId() {
        return parkId;
    }

    public void setParkId(Long parkId) {
        this.parkId = parkId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getStates() {
        return states;
    }

    public void setStates(String states) {
        this.states = states;
    }
}



