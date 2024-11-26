package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.Objects;

public class RecipeMethodLinkId implements Serializable {
    @Column(name = "recipe_id")
    private Integer recipeId;
    @Column(name = "method_id")
    private Integer methodId;

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getMethodId() {
        return methodId;
    }

    public void setMethodId(Integer methodId) {
        this.methodId = methodId;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return  true;
        if(o == null || getClass() != o.getClass()) return false;
        RecipeMethodLinkId that = (RecipeMethodLinkId) o;
        return Objects.equals(recipeId, that.recipeId) &&
                    Objects.equals(methodId, that.methodId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, methodId);
    }
}
