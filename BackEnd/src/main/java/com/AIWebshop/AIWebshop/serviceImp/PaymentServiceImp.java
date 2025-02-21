package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.PaymentDao;
import com.AIWebshop.AIWebshop.entity.Payment;
import com.AIWebshop.AIWebshop.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImp implements PaymentService {

    @Autowired
    private PaymentDao paymentDao;


    @Override
    public List<Payment> findAll() {
        return paymentDao.findAll();
    }
}
