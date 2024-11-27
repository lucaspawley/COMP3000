package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Ingredient;
import com.springboot.sousChefAPI.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/ingredients")
    public List<Ingredient> getAll() {
        return ingredientService.getAllIngredients();
    }

    @PostMapping("/ingredient")
    public Ingredient save(@RequestBody Ingredient ingredient) {
        ingredientService.saveIngredient(ingredient);
        return ingredient;
    }
}
