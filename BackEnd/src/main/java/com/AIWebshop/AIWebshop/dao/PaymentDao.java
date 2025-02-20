package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.Payment;

import java.util.List;

public interface PaymentDao {
    List<Payment> findAll();
}
