package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.model.DietPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietPreferenceRepository extends JpaRepository<DietPreference, Integer> {
    DietPreference findByDietPreferenceName(String DietPreferenceName);
}
