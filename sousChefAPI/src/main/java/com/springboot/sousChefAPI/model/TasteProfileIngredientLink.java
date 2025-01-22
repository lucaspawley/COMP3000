package com.springboot.sousChefAPI.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_link_taste_profile_ingredient")
public class TasteProfileIngredientLink {
    @EmbeddedId
    private TasteProfileIngredientLinkId id;

    public TasteProfileIngredientLinkId getId() {
        return id;
    }

    public void setId(TasteProfileIngredientLinkId id) {
        this.id = id;
    }

    public Integer getTasteProfileId() {
        return id.getTasteProfileId();
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        id.setTasteProfileId(tasteProfileId);
    }

    public Integer getIngredientId() {
        return id.getIngredientId();
    }

    public void setIngredientId(Integer ingredientId) {
        id.setIngredientId(ingredientId);
    }
}
