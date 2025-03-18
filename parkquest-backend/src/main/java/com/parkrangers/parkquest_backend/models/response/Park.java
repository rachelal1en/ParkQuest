package com.parkrangers.parkquest_backend.models.response;

import jakarta.persistence.*;

@Entity
@Table (name = "favorite_park")
public class Park {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "park_id")
    private Long parkId;

    @Column(name = "full_name")
    private Long fullName;

    @Column(name = "state_name")
    private Long states;

    public Park() {}

    public Long getParkId() {
        return parkId;
    }

    public void setParkId(Long parkId) {
        this.parkId = parkId;
    }

    public Long getFullName() {
        return fullName;
    }

    public void setFullName(Long fullName) {
        this.fullName = fullName;
    }

    public Long getStates() {
        return states;
    }

    public void setStates(Long states) {
        this.states = states;
    }
}



