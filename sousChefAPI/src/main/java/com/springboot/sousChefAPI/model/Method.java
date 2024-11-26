package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_method")
public class Method {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer method_id;

    @Column
    private Integer method_step;

    @Column
    private String method_description;

    public Integer getMethod_id() {
        return method_id;
    }

    public void setMethod_id(Integer method_id) {
        this.method_id = method_id;
    }

    public Integer getMethod_step() {
        return method_step;
    }

    public void setMethod_step(Integer method_step) {
        this.method_step = method_step;
    }

    public String getMethod_description() {
        return method_description;
    }

    public void setMethod_description(String method_description) {
        this.method_description = method_description;
    }
}
