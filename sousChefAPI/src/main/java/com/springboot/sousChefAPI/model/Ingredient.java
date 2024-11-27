package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Integer ingredientId;

    @Column(name = "ingredient_name")
    private String ingredientName;

    public Integer getIngredient_id() {
        return ingredientId;
    }

    public void setIngredient_id(Integer ingredient_id) {
        this.ingredientId = ingredient_id;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }
}
