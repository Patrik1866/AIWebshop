package com.AIWebshop.AIWebshop.dao;

import com.AIWebshop.AIWebshop.entity.SubCategory;

import java.util.List;

public interface SubCategoryDao {
    List<SubCategory> findAll();
    List<SubCategory> findByCategoryId(int id);
}
