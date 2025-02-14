package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_recipe_favourite")
public class FavouriteRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favourite_id;

    @Column(name = "recipe_id")
    private Integer recipeId;

    @Column(name = "account_id")
    private Integer accountId;

    public Integer getFavourite_id() {
        return favourite_id;
    }

    public void setFavourite_id(Integer favourite_id) {
        this.favourite_id = favourite_id;
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
}
