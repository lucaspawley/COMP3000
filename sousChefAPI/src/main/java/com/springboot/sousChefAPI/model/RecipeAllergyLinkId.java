package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.Objects;

public class RecipeAllergyLinkId implements Serializable {
    @Column(name = "recipe_id")
    private Integer recipeId;
    @Column(name = "allergy_id")
    private Integer allergyId;

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getAllergyId() {
        return allergyId;
    }

    public void setAllergyId(Integer ingredient_id) {
        this.allergyId = ingredient_id;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return  true;
        if(o == null || getClass() != o.getClass()) return false;
        RecipeAllergyLinkId that = (RecipeAllergyLinkId) o;
        return Objects.equals(recipeId, that.recipeId) &&
                    Objects.equals(allergyId, that.allergyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, allergyId);
    }
}
