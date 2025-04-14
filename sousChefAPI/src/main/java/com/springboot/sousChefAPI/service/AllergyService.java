package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.repository.AllergyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AllergyService {

    @Autowired
    private AllergyRepository allergyRepository;

    public List<Allergy> getAllAllergies() {
        return allergyRepository.findAll();
    }

    public Optional<Allergy> getAllergyById(int id) {
        return allergyRepository.findById(id);
    }

    public Allergy saveAllergy(Allergy allergy) {
        Allergy allergyExists = allergyRepository.findByAllergyName(allergy.getAllergyName());

        return Objects.requireNonNullElseGet(allergyExists, () -> allergyRepository.save(allergy));
    }

    public Allergy findByAllergyName(String allergyName) {
        return allergyRepository.findByAllergyName(allergyName);
    }

    public void deleteAllergy(int id) {
        allergyRepository.deleteById(id);
    }
}
