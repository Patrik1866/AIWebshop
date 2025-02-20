package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.Payment;

import java.util.List;

public interface PaymentService {
    List<Payment> findAll();
}
