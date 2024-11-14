package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy, Integer> {
}
