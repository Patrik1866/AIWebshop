package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductRestController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> findAll(){
        return productService.findAll();
    }

    @PostMapping("/products")
    public ResponseEntity<Product> save(@RequestBody Product product){
        Product createdProduct = productService.save(product);
        return ResponseEntity.ok(createdProduct);
    }
}
