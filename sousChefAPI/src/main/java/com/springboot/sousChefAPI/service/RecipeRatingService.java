package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Recipe;
import com.springboot.sousChefAPI.model.RecipeRating;
import com.springboot.sousChefAPI.repository.RecipeRatingRepository;
import com.springboot.sousChefAPI.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeRatingService {

    @Autowired
    private RecipeRatingRepository recipeRatingRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public RecipeRating getRecipeRatingByRecipeIdAndAccountId(Integer recipeId, Integer accountId) {
        return recipeRatingRepository.findByRecipeIdAndAccountId(recipeId, accountId);
    }

    public List<RecipeRating> getRecipeRatingByRecipeId(Integer recipeId) {
        return recipeRatingRepository.findByRecipeId(recipeId);
    }

    @Transactional
    public Optional<Recipe> saveRecipeRatingAndUpdateRecipe(Integer recipeId, Integer accountId, Integer rating) {
        RecipeRating recipeRating = new RecipeRating();
        recipeRating.setRecipeId(recipeId);
        recipeRating.setAccountId(accountId);
        recipeRating.setRecipeRating(rating);
        recipeRatingRepository.save(recipeRating);

        List<Double> ratings = recipeRatingRepository.findAllByRecipeId(recipeId)
                .stream()
                .map(RecipeRating::getRecipeRating)
                .map(Double::valueOf)
                .collect(Collectors.toList());

        double meanRating = calculateMean(ratings);

        double roundedMeanRating = Math.round(meanRating * 100.0) / 100.0;

        Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();
            recipe.setRecipe_rating(roundedMeanRating);
            recipeRepository.save(recipe);
        }

        return recipeOptional;
    }


    private double calculateMean(List<Double> ratings) {
        if (ratings.isEmpty()) {
            return 0.0;
        }
        return ratings.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

}
