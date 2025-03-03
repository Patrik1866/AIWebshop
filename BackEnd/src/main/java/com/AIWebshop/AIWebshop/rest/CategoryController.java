package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Category;
import com.AIWebshop.AIWebshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> findAll(){return categoryService.findAll();}
}
