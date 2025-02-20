package com.AIWebshop.AIWebshop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_type")
public class Payment {

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "payment_type_id")
    private int id;
    private String name;
    private String description;
}
