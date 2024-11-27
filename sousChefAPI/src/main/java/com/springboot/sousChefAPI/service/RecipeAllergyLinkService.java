package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.RecipeAllergyLink;
import com.springboot.sousChefAPI.model.RecipeAllergyLinkId;
import com.springboot.sousChefAPI.repository.RecipeAllergyLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecipeAllergyLinkService {
    @Autowired
    private RecipeAllergyLinkRepository repository;

    public RecipeAllergyLink saveRecipeAllergyLink(int recipeId, int allergyId){
        RecipeAllergyLinkId compositeId = new RecipeAllergyLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setAllergyId(allergyId);

        RecipeAllergyLink link = new RecipeAllergyLink();
        link.setId(compositeId);

        return repository.save(link);
    }

    public RecipeAllergyLink linkExists(int recipeId, int allergyId){
        RecipeAllergyLinkId compositeId = new RecipeAllergyLinkId();
        compositeId.setRecipeId(recipeId);
        compositeId.setAllergyId(allergyId);

        return repository.findById(compositeId);
    }
}
