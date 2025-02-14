package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.RecipeRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRatingRepository extends JpaRepository<RecipeRating, Integer> {
    RecipeRating findByRecipeIdAndAccountId(Integer recipeId, Integer accountId);
    List<RecipeRating> findByRecipeId(Integer recipeId);
    List<RecipeRating> findAllByRecipeId(Integer recipeId);
}
