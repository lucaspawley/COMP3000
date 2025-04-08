package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.*;
import com.springboot.sousChefAPI.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeIngredientService recipeIngredientService;

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

    @Autowired
    private FavouriteRecipeService favouriteRecipeService;

    @GetMapping("/recipes")
    public List<Recipe> getAll() {
        return recipeService.getAllRecipes();
    }

    @PostMapping(value = "/recipe", consumes = {"multipart/form-data"})
    @Transactional
    public Recipe save(@RequestPart("recipe") Recipe recipe,
                       @RequestPart(value = "image", required = false) MultipartFile file) {

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

        List<RecipeIngredient> ingredients = recipe.getIngredients();
        for (RecipeIngredient ingredient : ingredients) {
            if (ingredient.getRecipe_ingredient_name() != null) {
                RecipeIngredient findIngredient = recipeIngredientService.findByName(ingredient.getRecipe_ingredient_name());
                if (findIngredient == null) {
                    recipeIngredientService.saveIngredient(ingredient);
                } else {
                    ingredient.setRecipe_ingredient_id(findIngredient.getRecipe_ingredient_id());
                }
            }
        }

        List<Method> methods = recipe.getMethods();
        for (Method method : methods) {
            methodService.saveMethod(method);
        }

        recipeService.saveRecipe(recipe, file);
        Integer recipeId = recipe.getRecipe_id();

        for (RecipeIngredient ingredient : ingredients) {
            RecipeIngredientLink linkExists = recipeIngredientlinkService.linkExists(recipeId, ingredient.getRecipe_ingredient_id());
            if (linkExists != null) {
                recipeIngredientlinkService.saveRecipeIngredientLink(recipeId, ingredient.getRecipe_ingredient_id());
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

    @GetMapping("/recipe/favourite/{id}")
    public List<Recipe> getFavouriteRecipeByAccountId(@PathVariable int id) {
        return favouriteRecipeService.getByAccountId(id);
    }

    @GetMapping("/recipe/top")
    public List<Recipe> getTop10Recipes() {
        return recipeService.getTop10Recipes();
    }

    @GetMapping("/random")
    public List<Recipe> getRandomRecipes() {
        return recipeService.getRandomRecipes();
    }

    @PostMapping("/recipe/favourite")
    public ResponseEntity<Map<String, String>> favouriteRecipe(@RequestBody FavouriteRecipe favouriteRecipe){
        favouriteRecipeService.save(favouriteRecipe);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Recipe added to favourites!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recipe/{id}")
    public Recipe getRecipeById(@PathVariable int id) {
        return recipeService.getRecipeById(id)
                .map(recipe -> new ResponseEntity<>(recipe, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();
    }

    @GetMapping("/recipe/account/{accountID}")
    public List<Recipe> getByAccountId(@PathVariable int accountID) {
        return recipeService.findByAccountId(accountID);
    }
}
