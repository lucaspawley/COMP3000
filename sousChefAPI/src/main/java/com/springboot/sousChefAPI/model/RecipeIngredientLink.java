package com.springboot.sousChefAPI.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_link_recipe_ingredient")
public class RecipeIngredientLink {
    @EmbeddedId
    private RecipeIngredientLinkId id;

    public RecipeIngredientLinkId getId() {
        return id;
    }

    public void setId(RecipeIngredientLinkId id) {
        this.id = id;
    }

    public Integer getRecipeId() {
        return id.getRecipeId();
    }

    public void setRecipeId(Integer recipeId) {
        id.setRecipeId(recipeId);
    }

    public Integer getIngredientId() {
        return id.getIngredientId();
    }

    public void setIngredientId(Integer ingredientId) {
        id.setIngredientId(ingredientId);
    }
}
