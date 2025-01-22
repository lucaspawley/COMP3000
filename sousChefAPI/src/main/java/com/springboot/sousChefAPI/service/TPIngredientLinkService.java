package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfileDietPreferenceLink;
import com.springboot.sousChefAPI.model.TasteProfileDietPreferenceLinkId;
import com.springboot.sousChefAPI.repository.TPDietPreferenceLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TPDietPreferenceLinkService {

    @Autowired
    private TPDietPreferenceLinkRepository tpDietPreferenceLinkRepository;

    public TasteProfileDietPreferenceLink saveTPAllergyLink(Integer tasteProfileId, Integer allergyId){
        TasteProfileDietPreferenceLinkId compositeId= new TasteProfileDietPreferenceLinkId();
        compositeId.setTasteProfileId(tasteProfileId);
        compositeId.setDietPreferenceId(allergyId);

        TasteProfileDietPreferenceLink link = new TasteProfileDietPreferenceLink();
        link.setId(compositeId);

        return tpDietPreferenceLinkRepository.save(link);
    }

    public void deleteTPAllergyLink(TasteProfileDietPreferenceLinkId id) {
        tpDietPreferenceLinkRepository.deleteById(id);
    }
}
