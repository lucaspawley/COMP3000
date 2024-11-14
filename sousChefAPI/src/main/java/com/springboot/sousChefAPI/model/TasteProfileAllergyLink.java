package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_link_taste_profile_allergy")
public class TasteProfileAllergyLink {
    @EmbeddedId
    private TasteProfileAllergyLinkId id;

    public TasteProfileAllergyLinkId getId() {
        return id;
    }

    public void setId(TasteProfileAllergyLinkId id) {
        this.id = id;
    }

    public Integer getTasteProfileId() {
        return id.getTasteProfileId();
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        id.setTasteProfileId(tasteProfileId);
    }

    public Integer getAllergyId() {
        return id.getAllergyId();
    }

    public void setAllergyId(Integer allergyId) {
        id.setAllergyId(allergyId);
    }
}
