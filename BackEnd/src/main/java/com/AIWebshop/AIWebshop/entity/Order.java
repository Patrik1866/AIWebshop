package com.AIWebshop.AIWebshop.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStateId() {
        return stateId;
    }

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }

    public int getPaymentTypeId() {
        return paymentTypeId;
    }

    public void setPaymentTypeId(int paymentTypeId) {
        this.paymentTypeId = paymentTypeId;
    }

    public int getShippingTypeId() {
        return shippingTypeId;
    }

    public void setShippingTypeId(int shippingTypeId) {
        this.shippingTypeId = shippingTypeId;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "address_id")
    private int addressId;

    @Column(name = "shipping_type_id")
    private int shippingTypeId;

    @Column(name = "payment_type_id")
    private int paymentTypeId;

    @Column(name = "state_id")
    private int stateId;

}
