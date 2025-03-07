package com.AIWebshop.AIWebshop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "states")
public class States {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "state_id")
    private int id;
    private String name;
}
