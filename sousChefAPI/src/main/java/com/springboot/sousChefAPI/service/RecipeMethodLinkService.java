package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.RecipeMethodLink;
import com.springboot.sousChefAPI.model.RecipeMethodLinkId;
import com.springboot.sousChefAPI.repository.RecipeMethodLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeMethodLinkService {
    @Autowired
    private RecipeMethodLinkRepository repository;

    public RecipeMethodLink saveRecipeMethodLink(int recipeId, int methodId){
        RecipeMethodLinkId compositeId = new RecipeMethodLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setMethodId(methodId);

        RecipeMethodLink link = new RecipeMethodLink();
        link.setId(compositeId);

        return repository.save(link);
    }

    public RecipeMethodLink linkExists(int recipeId, int methodId){
        RecipeMethodLinkId compositeId = new RecipeMethodLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setMethodId(methodId);

        return repository.findById(compositeId);
    }
}
