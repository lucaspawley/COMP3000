package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.RecipeAllergyLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeAllergyLinkRepository extends JpaRepository<RecipeAllergyLink, Integer> {
}
