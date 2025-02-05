package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Integer> {
    RecipeIngredient findByRecipeIngredientName(String recipeIngredientName);
}
