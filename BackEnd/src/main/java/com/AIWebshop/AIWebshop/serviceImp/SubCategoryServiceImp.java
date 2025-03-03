package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.SubCategoryDao;
import com.AIWebshop.AIWebshop.entity.SubCategory;
import com.AIWebshop.AIWebshop.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryServiceImp implements SubCategoryService {
    @Autowired
    private SubCategoryDao subCategoryDao;

    @Override
    public List<SubCategory> findAll() {
        return subCategoryDao.findAll();
    }

    @Override
    public List<SubCategory> findByCategoryId(int id) {
        return subCategoryDao.findByCategoryId(id);
    }
}
