package com.parkrangers.parkquest_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name =  "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name="user_id", nullable = false)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "park_code")
    private String parkCode;

    @Column(name = "full_Name")
    private String fullName;

    @Column(name = "park_description")
    private String parkDescription;


    public Favorite(Long id, Long userId, String parkCode, String fullName, String parkDescription) {
        this.id = id;
        this.userId = userId;
        this.parkCode = parkCode;
        this.fullName = fullName;
        this.parkDescription = parkDescription;
    }

    public Favorite() {}

    public String getParkDescription() {
        return parkDescription;
    }

    public void setParkDescription(String parkDescription) {
        this.parkDescription = parkDescription;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long user) {
        this.userId = user;
    }

    public String getParkCode() {
        return parkCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setParkCode(String parkCode) {
        this.parkCode = parkCode;
    }
}
