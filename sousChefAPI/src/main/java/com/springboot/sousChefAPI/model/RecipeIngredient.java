package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_recipe_ingredient")
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipe_ingredient_id;

    @Column
    private String recipeIngredientName;

    @Column
    private Integer recipe_ingredient_amount;

    @Column
    private String recipe_ingredient_measurement;

    public Integer getRecipe_ingredient_id() {
        return recipe_ingredient_id;
    }

    public void setRecipe_ingredient_id(Integer recipe_ingredient_id) {
        this.recipe_ingredient_id = recipe_ingredient_id;
    }

    public String getRecipe_ingredient_name() {
        return recipeIngredientName;
    }

    public void setRecipe_ingredient_name(String recipe_ingredient_name) {
        this.recipeIngredientName = recipe_ingredient_name;
    }

    public Integer getRecipe_ingredient_amount() {
        return recipe_ingredient_amount;
    }

    public void setRecipe_ingredient_amount(Integer recipe_ingredient_amount) {
        this.recipe_ingredient_amount = recipe_ingredient_amount;
    }

    public String getRecipe_ingredient_measurement() {
        return recipe_ingredient_measurement;
    }

    public void setRecipe_ingredient_measurement(String recipe_ingredient_measurement) {
        this.recipe_ingredient_measurement = recipe_ingredient_measurement;
    }
}
