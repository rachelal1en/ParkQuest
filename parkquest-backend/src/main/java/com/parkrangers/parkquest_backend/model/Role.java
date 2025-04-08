package com.parkrangers.parkquest_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Roleid;

    private String name;

    public Role(Long Roleid, String name) {
        this.Roleid = Roleid;
        this.name = name;
    }

    public Role() {}

    public Long getRoleid() {
        return Roleid;
    }

    public void setRoleid(Long id) {
        this.Roleid = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}