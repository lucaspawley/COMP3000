package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Recipe;
import com.springboot.sousChefAPI.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll().stream().peek(Recipe::getImageBase64).collect(Collectors.toList());
    }

    public Optional<Recipe> getRecipeById(int id) {
        return recipeRepository.findById(id);
    }

    public List<Recipe> findByAccountId(int accountID) {
        return recipeRepository.findByAccountID(accountID).stream().peek(Recipe::getImageBase64).collect(Collectors.toList());
    }

    public Recipe saveRecipe(Recipe recipe, MultipartFile file) {
        try {
            if(file != null) {
                recipe.setImageData(file.getBytes());
            }
            return recipeRepository.save(recipe);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process image file", e);
        }
    }

    public void deleteRecipe(int id) {
        recipeRepository.deleteById(id);
    }
}
