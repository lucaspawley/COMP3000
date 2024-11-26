package com.springboot.sousChefAPI.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_link_recipe_ingredient")
public class RecipeMethodLink {
    @EmbeddedId
    private RecipeMethodLinkId id;

    public RecipeMethodLinkId getId() {
        return id;
    }

    public void setId(RecipeMethodLinkId id) {
        this.id = id;
    }

    public Integer getRecipeId() {
        return id.getRecipeId();
    }

    public void setRecipeId(Integer recipeId) {
        id.setRecipeId(recipeId);
    }

    public Integer getMethodId() {
        return id.getMethodId();
    }

    public void setMethodId(Integer methodId) {
        id.setMethodId(methodId);
    }
}
