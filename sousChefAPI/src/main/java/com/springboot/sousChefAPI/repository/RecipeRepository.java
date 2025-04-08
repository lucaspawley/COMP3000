package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByAccountID(int accountID);

    @Query("SELECT r FROM Recipe r ORDER BY r.recipe_rating DESC LIMIT 10")
    List<Recipe> findTop10ByRating();

    @Query(value = "SELECT * FROM tbl_recipe ORDER BY RAND() LIMIT 12", nativeQuery = true)
    List<Recipe> findRandomRecipes();
}
