package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TasteProfileAllergyLinkId implements Serializable {
    @Column(name = "taste_profile_id")
    private Integer tasteProfileId;
    @Column(name = "allergy_id")
    private Integer allergyId;

    public Integer getTasteProfileId() {
        return tasteProfileId;
    }

    public void setTasteProfileId(Integer tasteProfileId) {
        this.tasteProfileId = tasteProfileId;
    }

    public Integer getAllergyId() {
        return allergyId;
    }

    public void setAllergyId(Integer allergyId) {
        this.allergyId = allergyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TasteProfileAllergyLinkId that = (TasteProfileAllergyLinkId) o;
        return Objects.equals(tasteProfileId, that.tasteProfileId) &&
                Objects.equals(allergyId, that.allergyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tasteProfileId, allergyId);
    }
}
