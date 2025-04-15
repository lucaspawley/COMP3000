package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Ingredient findByIngredientName(String ingredientName);

    @Query("SELECT i from Ingredient i WHERE LOWER(i.ingredientName) LIKE LOWER(CONCAT('%', :ingredientName, '%'))")
    List<Ingredient> searchIngredient(@Param("ingredientName") String ingredientName);
}
