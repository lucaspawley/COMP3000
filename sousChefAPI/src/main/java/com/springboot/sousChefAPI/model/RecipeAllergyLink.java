package com.springboot.sousChefAPI.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_link_recipe_allergy")
public class RecipeAllergyLink {
    @EmbeddedId
    private RecipeAllergyLinkId id;

    public RecipeAllergyLinkId getId() {
        return id;
    }

    public void setId(RecipeAllergyLinkId id) {
        this.id = id;
    }

    public Integer getRecipeId() {
        return id.getRecipeId();
    }

    public void setRecipeId(Integer recipeId) {
        id.setRecipeId(recipeId);
    }

    public Integer getAllergyId() {
        return id.getAllergyId();
    }

    public void setAllergyId(Integer allergyId) {
        id.setAllergyId(allergyId);
    }
}
