package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_recipe_ratings")
public class RecipeRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer rating_id;

    @Column(name = "recipe_id")
    private Integer recipeId;

    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "recipe_rating")
    private Integer recipeRating;

    public Integer getRating_id() {
        return rating_id;
    }

    public void setRating_id(Integer rating_id) {
        this.rating_id = rating_id;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Integer getRecipeRating() {
        return recipeRating;
    }

    public void setRecipeRating(Integer recipeRating) {
        this.recipeRating = recipeRating;
    }
}
