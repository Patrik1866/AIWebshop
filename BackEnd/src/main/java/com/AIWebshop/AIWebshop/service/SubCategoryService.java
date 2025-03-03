package com.AIWebshop.AIWebshop.service;

import com.AIWebshop.AIWebshop.entity.SubCategory;

import java.util.List;

public interface SubCategoryService {
    List<SubCategory> findAll();
    List<SubCategory> findByCategoryId(int id);
}
