package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Allergy;

import java.util.List;

public interface AllergyService {
    List<Allergy> get();
    Allergy get(int id);
    void save(Allergy allergy);
    void delete(int id);
}
