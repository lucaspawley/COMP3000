package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.dao.TasteProfileDAO;
import com.springboot.sousChefAPI.model.TasteProfile;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TasteProfileServiceImpl implements TasteProfileService {

    @Autowired
    private TasteProfileDAO tasteProfileDAO;

    @Transactional
    @Override
    public List<TasteProfile> get() {
        return tasteProfileDAO.get();
    }

    @Transactional
    @Override
    public TasteProfile get(int id) {
        return tasteProfileDAO.get(id);
    }

    @Transactional
    @Override
    public void save(TasteProfile tasteProfile) {
        tasteProfileDAO.save(tasteProfile);
    }

    @Transactional
    @Override
    public void delete(int id) {
        tasteProfileDAO.delete(id);
    }
}
