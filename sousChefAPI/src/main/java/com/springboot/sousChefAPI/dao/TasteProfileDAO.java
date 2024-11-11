package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.TasteProfile;

import java.util.List;

public interface TasteProfileDAO {
    List<TasteProfile> get();
    TasteProfile get(int id);
    void save(TasteProfile account);
    void delete(int id);
}
