package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductRestController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> findAll(){
        return productService.findAll();
    }

    @GetMapping("/products/{id}")
    public Product findByProductId(@PathVariable int id){
        return productService.findByProductId(id);
    }

    @GetMapping("/products/category/{id}")
    public List<Product> findByCategoryId(@PathVariable int id){
        return productService.findByCategoryId(id);
    }

    @GetMapping("/products/subcategory/{id}")
    public List<Product> findBySubCategoryId(@PathVariable int id){
        return productService.findBySubCategoryId(id);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> save(@RequestBody Product product){
        Product createdProduct = productService.save(product);
        return ResponseEntity.ok(createdProduct);
    }
}
