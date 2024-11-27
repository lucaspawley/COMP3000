package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.*;
import com.springboot.sousChefAPI.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private RecipeIngredientLinkService recipeIngredientlinkService;

    @Autowired
    private AllergyService allergyService;

    @Autowired
    private RecipeAllergyLinkService recipeAllergyLinkService;

    @Autowired
    private MethodService methodService;

    @Autowired
    private RecipeMethodLinkService recipeMethodLinkService;

    @GetMapping("/recipes")
    public List<Recipe> getAll() {
        return recipeService.getAllRecipes();
    }

    @PostMapping("/recipe")
    @Transactional
    public Recipe save(@RequestBody Recipe recipe) {

        List<Ingredient> ingredients = recipe.getIngredients();
        for (Ingredient ingredient : ingredients) {
            if (ingredient.getIngredientName() != null) {
                Ingredient findIngredient = ingredientService.findByName(ingredient.getIngredientName());
                if (findIngredient == null) {
                    ingredientService.saveIngredient(ingredient);
                } else {
                    ingredient.setIngredient_id(findIngredient.getIngredient_id());
                }
            }
        }

        List<Allergy> allergies = recipe.getAllergies();
        for (Allergy allergy : allergies) {
            if (allergy.getAllergyName() != null) {
                Allergy findAllergy = allergyService.findByAllergyName(allergy.getAllergyName());
                if (findAllergy == null) {
                    allergyService.saveAllergy(allergy);
                } else {
                    allergy.setAllergyId(findAllergy.getAllergyId());
                }
            }
        }

        List<Method> methods = recipe.getMethods();
        for (Method method : methods) {
            methodService.saveMethod(method);
        }

        recipeService.saveRecipe(recipe);
        Integer recipeId = recipe.getRecipe_id();

        for (Ingredient ingredient : ingredients) {
            RecipeIngredientLink linkExists = recipeIngredientlinkService.linkExists(recipeId, ingredient.getIngredient_id());
            if (ingredient.getIngredient_id() != null) {
                recipeIngredientlinkService.saveRecipeIngredientLink(recipeId, ingredient.getIngredient_id());
            }
        }

        for (Allergy allergy : allergies) {
            RecipeAllergyLink linkExists = recipeAllergyLinkService.linkExists(recipeId, allergy.getAllergyId());
            if (linkExists != null) {
                recipeAllergyLinkService.saveRecipeAllergyLink(recipeId, allergy.getAllergyId());
            }
        }

        for (Method method : methods) {
            RecipeMethodLink linkExists = recipeMethodLinkService.linkExists(recipeId, method.getMethodId());
            if (linkExists != null) {
                recipeMethodLinkService.saveRecipeMethodLink(recipeId, method.getMethodId());
            }
        }

        return recipe;
    }

}
