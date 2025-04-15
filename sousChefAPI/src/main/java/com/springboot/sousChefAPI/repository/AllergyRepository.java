package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy, Integer> {
    Allergy findByAllergyName(String allergyName);

    @Query("SELECT a from Allergy a WHERE LOWER(a.allergyName) LIKE LOWER(CONCAT('%', :allergyName, '%'))")
    List<Allergy> searchAllergy(@Param("allergyName") String allergyName);
}
