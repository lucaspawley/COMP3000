package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfile;

import java.util.List;

public interface TasteProfileService {
    List<TasteProfile> get();
    TasteProfile get(int id);
    void save(TasteProfile tasteProfile);
    void delete(int id);
}
