package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.FavouriteRecipe;
import com.springboot.sousChefAPI.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteRecipeRepository extends JpaRepository<FavouriteRecipe, Integer> {
    @Query("SELECT r FROM Recipe r JOIN FavouriteRecipe fr ON r.id = fr.recipeId WHERE fr.accountId = :accountId")
    List<Recipe> findRecipeByAccountId(Integer accountId);

    List<FavouriteRecipe> findByAccountId(Integer accountId);
}
