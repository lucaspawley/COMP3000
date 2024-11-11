package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.dao.AllergyDAO;
import com.springboot.sousChefAPI.model.Allergy;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllergyServiceImpl implements AllergyService {

    @Autowired
    private AllergyDAO allergyDAO;

    @Transactional
    @Override
    public List<Allergy> get() {
        return allergyDAO.get();
    }

    @Override
    public Allergy get(int id) {
        return allergyDAO.get(id);
    }

    @Override
    public void save(Allergy allergy) {
        allergyDAO.save(allergy);
    }

    @Override
    public void delete(int id) {
        allergyDAO.delete(id);
    }
}
