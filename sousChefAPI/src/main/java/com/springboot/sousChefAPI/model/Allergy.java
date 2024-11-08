package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_allergy")
public class Allergy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @PrimaryKeyJoinColumn
    @Column
    private Integer allergy_id;

    @Column
    private String allergy_name;

    public Integer getAllergy_id() {
        return allergy_id;
    }

    public void setAllergy_id(Integer allergy_id) {
        this.allergy_id = allergy_id;
    }

    public String getAllergy_name() {
        return allergy_name;
    }

    public void setAllergy_name(String allergy_name) {
        this.allergy_name = allergy_name;
    }
}
