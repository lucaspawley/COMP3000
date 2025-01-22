package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TasteProfileDietPreferenceLinkId implements Serializable {
    @Column(name = "taste_profile_id")
    private Integer tasteProfileId;
    @Column(name = "dietPreference_id")
    private Integer dietPreferenceId;

    public Integer getTasteProfileId() {
        return tasteProfileId;
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        this.tasteProfileId = tasteProfileId;
    }

    public Integer getDietPreferenceId() {
        return dietPreferenceId;
    }

    public void setDietPreferenceId(Integer dietPreferenceId) {
        this.dietPreferenceId = dietPreferenceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TasteProfileDietPreferenceLinkId that = (TasteProfileDietPreferenceLinkId) o;
        return Objects.equals(tasteProfileId, that.tasteProfileId) &&
                Objects.equals(dietPreferenceId, that.dietPreferenceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tasteProfileId, dietPreferenceId);
    }
}
