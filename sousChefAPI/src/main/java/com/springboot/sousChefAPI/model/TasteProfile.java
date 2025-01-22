package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_taste_profile")
public class TasteProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tasteProfileId;

    @ManyToMany
    @JoinTable(name = "tbl_link_taste_profile_allergy",
            joinColumns = @JoinColumn(name = "taste_profile_id"), inverseJoinColumns = @JoinColumn(name = "allergy_id"))
    private List<Allergy> allergies = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tbl_link_taste_profile_dietPreference",
            joinColumns = @JoinColumn(name = "taste_profile_id"), inverseJoinColumns = @JoinColumn(name = "dietPreference_id"))
    private List<DietPreference> dietPreferences = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tbl_link_taste_profile_ingredient",
            joinColumns = @JoinColumn(name = "taste_profile_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<Ingredient> ingredients = new ArrayList<>();

    public Integer getTasteProfileId() {
        return tasteProfileId;
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        this.tasteProfileId = tasteProfileId;
    }

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergies(List<Allergy> allergies) {
        this.allergies = allergies;
    }

    public List<DietPreference> getDietPreferences() {
        return dietPreferences;
    }

    public void setDietPreferences(List<DietPreference> dietPreferences) {
        this.dietPreferences = dietPreferences;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
