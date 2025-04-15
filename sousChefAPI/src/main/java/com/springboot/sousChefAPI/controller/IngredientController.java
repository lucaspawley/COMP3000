package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Ingredient;
import com.springboot.sousChefAPI.service.IngredientService;
import com.springboot.sousChefAPI.service.RecipeIngredientLinkService;
import com.springboot.sousChefAPI.service.TPIngredientLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private RecipeIngredientLinkService recipeIngredientLinkService;

    @Autowired
    private TPIngredientLinkService ingredientLinkService;

    @GetMapping("/ingredients")
    public List<Ingredient> getAll() {
        return ingredientService.getAllIngredients();
    }

    @PostMapping("/ingredient/add/{tasteProfileId}")
    public Ingredient save(@RequestBody Ingredient ingredient, @PathVariable int tasteProfileId) {
        Ingredient newIngredient= ingredientService.saveIngredient(ingredient);
        ingredientLinkService.saveTPingredientLink(tasteProfileId, newIngredient.getIngredient_id());

        return newIngredient;
    }

    @PostMapping("/ingredient/delete/{tasteProfileId}")
    public void deleteIngredient(@RequestBody Ingredient ingredient, @PathVariable int tasteProfileId) {
        ingredientLinkService.deleteLink(ingredient.getIngredient_id(), tasteProfileId);
    }

    @GetMapping("/ingredient/search")
    public List<Ingredient> searchIngredient(@RequestParam String ingredientName) {
        return ingredientService.searchIngredient(ingredientName);
    }

    @PostMapping("/recipeIngredient/delete/{ingredientId}")
    public void deleteIngredient(@PathVariable Integer ingredientId, @RequestBody Integer recipeId) {
        recipeIngredientLinkService.deleteLink(ingredientId, recipeId);
    }
}
