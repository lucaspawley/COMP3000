package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.Allergy;

import java.util.List;

public interface AllergyDAO {
    List<Allergy> get();
    Allergy get(int id);
    void save(Allergy allergy);
    void delete(int id);
}
