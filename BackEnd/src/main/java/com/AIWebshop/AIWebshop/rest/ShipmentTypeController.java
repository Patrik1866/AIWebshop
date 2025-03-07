package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.ShipmentType;
import com.AIWebshop.AIWebshop.service.ShipmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/shipmentType")
public class ShipmentTypeController {
    @Autowired
    private ShipmentTypeService shipmentTypeService;

    @GetMapping
    public List<ShipmentType> findAll() { return shipmentTypeService.findAll(); }
}
