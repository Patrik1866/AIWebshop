package com.AIWebshop.AIWebshop.serviceImp;

import com.AIWebshop.AIWebshop.dao.StatesDao;
import com.AIWebshop.AIWebshop.entity.States;
import com.AIWebshop.AIWebshop.service.StatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatesServiceImp implements StatesService {
    @Autowired
    private StatesDao statesDao;
    @Override
    public List<States> findAll() {
        return statesDao.findAll();
    }
}
