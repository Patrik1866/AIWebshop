package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> findAll(){
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Product findByProductId(@PathVariable int id){
        return productService.findByProductId(id);
    }

    @GetMapping("/category/{id}")
    public List<Product> findByCategoryId(@PathVariable int id){
        return productService.findByCategoryId(id);
    }

    @GetMapping("/subcategory/{id}")
    public List<Product> findBySubCategoryId(@PathVariable int id){
        return productService.findBySubCategoryId(id);
    }

    @PostMapping
    public ResponseEntity<Product> save(@RequestBody Product product){
        Product createdProduct = productService.save(product);
        return ResponseEntity.ok(createdProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteById(@PathVariable int id){
        Product product = productService.findByProductId(id);

        if (product == null) {
            throw new RuntimeException("");
        }

        productService.deleteById(id);

        return ResponseEntity.ok(product);
    }
}
