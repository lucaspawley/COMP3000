package com.springboot.sousChefAPI.service;


import com.springboot.sousChefAPI.model.RecipeIngredient;
import com.springboot.sousChefAPI.repository.RecipeIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeIngredientService {
    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    public List<RecipeIngredient> getAllIngredients() {
        return recipeIngredientRepository.findAll();
    }

    public RecipeIngredient saveIngredient(RecipeIngredient ingredient){
        return recipeIngredientRepository.save(ingredient);
    }

    public RecipeIngredient findByName(String ingredientName){
        return recipeIngredientRepository.findByRecipeIngredientName(ingredientName);
    }

    public void deleteIngredient(int id){
        recipeIngredientRepository.deleteById(id);
    }
}
