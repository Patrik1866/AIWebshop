package com.AIWebshop.AIWebshop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shipment_type")
public class ShipmentType {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

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

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "shipment_type_id")
    private int id;
    private String name;
    private String description;
    private int price;

}
