package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByAccountID(int accountID);
}
