package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.model.DietPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietPreferenceRepository extends JpaRepository<DietPreference, Integer> {
    DietPreference findByDietPreferenceName(String DietPreferenceName);

    @Query("SELECT dp FROM DietPreference dp WHERE LOWER(dp.dietPreferenceName) LIKE LOWER(CONCAT('%', :dietPreferenceName, '%'))")
    List<DietPreference> searchDietPreference(@Param("dietPreferenceName") String dietPreferenceName);
}
