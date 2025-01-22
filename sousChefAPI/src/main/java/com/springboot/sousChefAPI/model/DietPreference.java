package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_dietPreference")
public class DietPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dietPreference_id")
    private Integer dietPreferenceId;

    @Column(name = "dietPreference_name")
    private String dietPreferenceName;

    public Integer getDietPreferenceId() {
        return dietPreferenceId;
    }

    public void setDietPreferenceId(Integer dietPreferenceId) {
        this.dietPreferenceId = dietPreferenceId;
    }

    public String getDietPreferenceName() {
        return dietPreferenceName;
    }

    public void setDietPreferenceName(String dietPreferenceName) {
        this.dietPreferenceName = dietPreferenceName;
    }
}
