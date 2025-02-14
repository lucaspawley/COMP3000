package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.FavouriteRecipe;
import com.springboot.sousChefAPI.model.Recipe;
import com.springboot.sousChefAPI.repository.FavouriteRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteRecipeService {

    @Autowired
    private FavouriteRecipeRepository favouriteRecipeRepository;

    public List<Recipe> getByAccountId(Integer accountId) {
        return favouriteRecipeRepository.findByAccountId(accountId);
    }

    ;

    public String save(FavouriteRecipe favouriteRecipe) {
        favouriteRecipeRepository.save(favouriteRecipe);

        return "Recipe add to favourites!";
    }
}
