package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipe_id;

    @Column
    private String recipe_name;

    @Column
    private Integer recipe_rating;

    @Column
    private Integer recipe_serves;

    @ManyToMany
    @JoinTable(name = "tbl_link_recipe_allergy",
            joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "allergy_id"))
    private List<Allergy> allergies = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tbl_link_recipe_ingredient",
            joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tbl_link_recipe_method",
            joinColumns = @JoinColumn(name = "recipe_id"), inverseJoinColumns = @JoinColumn(name = "method_id"))
    private List<Method> methods = new ArrayList<>();

    public Integer getRecipe_id() {
        return recipe_id;
    }

    public void setRecipe_id(Integer recipe_id) {
        this.recipe_id = recipe_id;
    }

    public String getRecipe_name() {
        return recipe_name;
    }

    public void setRecipe_name(String recipe_name) {
        this.recipe_name = recipe_name;
    }

    public Integer getRecipe_rating() {
        return recipe_rating;
    }

    public void setRecipe_rating(Integer recipe_rating) {
        this.recipe_rating = recipe_rating;
    }

    public Integer getRecipe_serves() {
        return recipe_serves;
    }

    public void setRecipe_serves(Integer recipe_serves) {
        this.recipe_serves = recipe_serves;
    }

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<Allergy> allergies) {
        this.allergies = allergies;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Method> getMethods() {
        return methods;
    }

    public void setMethods(List<Method> methods) {
        this.methods = methods;
    }
}
