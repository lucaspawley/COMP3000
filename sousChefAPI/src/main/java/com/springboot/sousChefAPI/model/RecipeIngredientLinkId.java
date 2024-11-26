package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.Objects;

public class RecipeIngredientLinkId implements Serializable {
    @Column(name = "recipe_id")
    private Integer recipeId;
    @Column(name = "ingredient_id")
    private Integer ingredientId;

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Integer ingredient_id) {
        this.ingredientId = ingredient_id;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return  true;
        if(o == null || getClass() != o.getClass()) return false;
        RecipeIngredientLinkId that = (RecipeIngredientLinkId) o;
        return Objects.equals(recipeId, that.recipeId) &&
                    Objects.equals(ingredientId, that.ingredientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, ingredientId);
    }
}
