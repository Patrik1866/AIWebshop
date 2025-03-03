package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.SubCategory;
import com.AIWebshop.AIWebshop.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subCategory")
public class SubCategoryController {
    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/{id}")
    public ResponseEntity<List<SubCategory>> getSubcategoriesByCategoryId(@PathVariable int id) {
        List<SubCategory> subcategories = subCategoryService.findByCategoryId(id);
        return ResponseEntity.ok(subcategories);
    }
}
