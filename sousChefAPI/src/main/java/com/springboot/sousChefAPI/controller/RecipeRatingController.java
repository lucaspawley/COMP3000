package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.RecipeRating;
import com.springboot.sousChefAPI.service.RecipeRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class RecipeRatingController {

    @Autowired
    private RecipeRatingService recipeRatingService;

    @PostMapping("/add")
    public ResponseEntity<RecipeRating> addRating(@RequestBody RecipeRating request) {
        RecipeRating savedRating = recipeRatingService.saveRecipeRatingAndUpdateRecipe(
                request.getRecipeId(),
                request.getAccountId(),
                request.getRecipeRating()
        );
        return ResponseEntity.ok(savedRating);
    }
}
