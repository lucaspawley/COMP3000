package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfileAllergyLink;
import com.springboot.sousChefAPI.model.TasteProfileAllergyLinkId;
import com.springboot.sousChefAPI.repository.TPAllergyLinkRepository;
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

    public void deleteTPAllergyLink(TasteProfileAllergyLinkId id) {
        tpAllergyLinkRepository.deleteById(id);
    }
}
