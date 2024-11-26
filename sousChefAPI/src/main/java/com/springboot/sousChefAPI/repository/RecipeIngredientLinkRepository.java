package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.RecipeIngredientLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientLinkRepository extends JpaRepository<RecipeIngredientLink, Integer> {
}
