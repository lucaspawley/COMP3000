package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TasteProfileIngredientLinkId implements Serializable {
    @Column(name = "taste_profile_id")
    private Integer tasteProfileId;
    @Column(name = "ingredient_id")
    private Integer ingredientId;

    public Integer getTasteProfileId() {
        return tasteProfileId;
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        this.tasteProfileId = tasteProfileId;
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Integer ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TasteProfileIngredientLinkId that = (TasteProfileIngredientLinkId) o;
        return Objects.equals(tasteProfileId, that.tasteProfileId) &&
                Objects.equals(ingredientId, that.ingredientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tasteProfileId, ingredientId);
    }
}
