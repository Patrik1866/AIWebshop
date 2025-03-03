package com.AIWebshop.AIWebshop.dao;


import com.AIWebshop.AIWebshop.entity.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> findAll();
}
