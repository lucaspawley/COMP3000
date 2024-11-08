package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tbl_taste_profile")
public class TasteProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @PrimaryKeyJoinColumn
    @Column
    private Integer tasteProfile_id;

    @OneToMany(mappedBy = "allergy_id")
    private List<Allergy> allergies;

    public Integer getTasteProfile_id() {
        return tasteProfile_id;
    }

    public void setTasteProfile_id(Integer tasteProfile_id) {
        this.tasteProfile_id = tasteProfile_id;
    }

    public List<Allergy> getAllergies() {
        return allergies;
    }

    public void setAllergy_id(List<Allergy> allergy) {
        this.allergies = allergy;
    }
}
