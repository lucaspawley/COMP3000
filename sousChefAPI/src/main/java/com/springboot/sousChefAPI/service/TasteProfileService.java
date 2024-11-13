package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfile;
import com.springboot.sousChefAPI.repository.TasteProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TasteProfileService {

    @Autowired
    private TasteProfileRepository tasteProfileRepository;

    public List<TasteProfile> getAllTasteProfiles() {
        return tasteProfileRepository.findAll();
    }

    public Optional<TasteProfile> getTasteProfileById(int id) {
        return tasteProfileRepository.findById(id);
    }

    public TasteProfile saveTasteProfile(TasteProfile tasteProfile) {
        return tasteProfileRepository.save(tasteProfile);
    }

    public void deleteTasteProfile(int id) {
        tasteProfileRepository.deleteById(id);
    }
}
