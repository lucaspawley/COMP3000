package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.RecipeIngredientLink;
import com.springboot.sousChefAPI.model.RecipeIngredientLinkId;
import com.springboot.sousChefAPI.repository.RecipeIngredientLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeIngredientLinkService {
    @Autowired
    private RecipeIngredientLinkRepository repository;

    public RecipeIngredientLink saveRecipeIngredientLink(int recipeId, int ingredientId){
        RecipeIngredientLinkId compositeId = new RecipeIngredientLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setIngredientId(ingredientId);

        RecipeIngredientLink link = new RecipeIngredientLink();
        link.setId(compositeId);

        return repository.save(link);
    }

    public RecipeIngredientLink linkExists(int recipeId, int ingredientId){
        RecipeIngredientLinkId compositeId = new RecipeIngredientLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setIngredientId(ingredientId);

        return repository.findById(compositeId);
    }
}
