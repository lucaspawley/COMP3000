package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfileAllergyLink;
import com.springboot.sousChefAPI.model.TasteProfileAllergyLinkId;
import com.springboot.sousChefAPI.repository.TPAllergyLinkRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TPAllergyLinkService {

    @Autowired
    private TPAllergyLinkRepository tpAllergyLinkRepository;

    public TasteProfileAllergyLink saveTPAllergyLink(Integer tasteProfileId, Integer allergyId){
        TasteProfileAllergyLinkId compositeId= new TasteProfileAllergyLinkId();
        compositeId.setTasteProfileId(tasteProfileId);
        compositeId.setAllergyId(allergyId);

        TasteProfileAllergyLink link = new TasteProfileAllergyLink();
        link.setId(compositeId);

        return tpAllergyLinkRepository.save(link);
    }

    @Transactional
    public void deleteLink(int allergyId, int tasteProfileId) {
        TasteProfileAllergyLinkId compositeId = new TasteProfileAllergyLinkId();
        compositeId.setAllergyId(allergyId);
        compositeId.setTasteProfileId(tasteProfileId);

        tpAllergyLinkRepository.deleteById(compositeId);
    }
}
