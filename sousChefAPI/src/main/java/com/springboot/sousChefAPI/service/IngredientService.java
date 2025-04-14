package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Ingredient;
import com.springboot.sousChefAPI.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient saveIngredient(Ingredient ingredient){

        Ingredient ingredientExists = ingredientRepository.findByIngredientName(ingredient.getIngredientName());

        return Objects.requireNonNullElseGet(ingredientExists, () -> ingredientRepository.save(ingredient));
    }

    public Ingredient findByName(String ingredientName){
        return ingredientRepository.findByIngredientName(ingredientName);
    }

    public void deleteIngredient(int id){
        ingredientRepository.deleteById(id);
    }
}
