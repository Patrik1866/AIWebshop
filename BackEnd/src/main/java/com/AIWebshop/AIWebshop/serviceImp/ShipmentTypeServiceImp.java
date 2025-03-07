package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.ShipmentTypeDao;
import com.AIWebshop.AIWebshop.entity.ShipmentType;
import com.AIWebshop.AIWebshop.service.ShipmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentTypeServiceImp implements ShipmentTypeService {
    @Autowired
    private ShipmentTypeDao shipmentTypeDao;
    @Override
    public List<ShipmentType> findAll() {
        return shipmentTypeDao.findAll();
    }
}
