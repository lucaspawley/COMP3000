package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Recipe;
import com.springboot.sousChefAPI.model.RecipeRating;
import com.springboot.sousChefAPI.service.RecipeRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RecipeRatingController {

    @Autowired
    private RecipeRatingService recipeRatingService;

    @PostMapping("/add")
    public Optional<Recipe> addRating(@RequestBody RecipeRating request) {
        Optional<Recipe> savedRating = recipeRatingService.saveRecipeRatingAndUpdateRecipe(
                request.getRecipeId(),
                request.getAccountId(),
                request.getRecipeRating()
        );
        return savedRating;
    }
}
