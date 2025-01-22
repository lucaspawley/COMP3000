package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.model.DietPreference;
import com.springboot.sousChefAPI.repository.AllergyRepository;
import com.springboot.sousChefAPI.repository.DietPreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DietPreferenceService {

    @Autowired
    private DietPreferenceRepository dietPreferenceRepository;

    public List<DietPreference> getAllDietPreference() {
        return dietPreferenceRepository.findAll();
    }

    public Optional<DietPreference> getDietPreferenceById(int id) {
        return dietPreferenceRepository.findById(id);
    }

    public DietPreference saveDietPreference(DietPreference dietPreference) {
        return dietPreferenceRepository.save(dietPreference);
    }

    public void deleteDietPreference(int id) {
        dietPreferenceRepository.deleteById(id);
    }

    public DietPreference findByDietPreferenceName(String dietPreferenceName) {
        return dietPreferenceRepository.findByDietPreferenceName(dietPreferenceName);
    }
}
