package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfileAllergyLink;
import com.springboot.sousChefAPI.repository.TPAllergyLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TPAllergyLinkService {

    @Autowired
    private TPAllergyLinkRepository tpAllergyLinkRepository;

    public TasteProfileAllergyLink saveTPAllergyLink(TasteProfileAllergyLink tasteProfileAllergyLink){
        return tpAllergyLinkRepository.save(tasteProfileAllergyLink);
    }

    public void deleteTPAllergyLink(int id) {
        tpAllergyLinkRepository.deleteById(id);
    }
}
