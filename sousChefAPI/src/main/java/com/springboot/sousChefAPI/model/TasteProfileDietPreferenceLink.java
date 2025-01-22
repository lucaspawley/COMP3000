package com.springboot.sousChefAPI.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_link_taste_profile_dietPreference")
public class TasteProfileDietPreferenceLink {
    @EmbeddedId
    private TasteProfileDietPreferenceLinkId id;

    public TasteProfileDietPreferenceLinkId getId() {
        return id;
    }

    public void setId(TasteProfileDietPreferenceLinkId id) {
        this.id = id;
    }

    public Integer getTasteProfileId() {
        return id.getTasteProfileId();
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        id.setTasteProfileId(tasteProfileId);
    }

    public Integer getDietPreferenceId() {
        return id.getDietPreferenceId();
    }

    public void setDietPreferenceId(Integer dietPreferenceId) {
        id.setDietPreferenceId(dietPreferenceId);
    }
}
