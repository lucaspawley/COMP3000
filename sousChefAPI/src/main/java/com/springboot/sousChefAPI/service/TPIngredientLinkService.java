package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.TasteProfileIngredientLink;
import com.springboot.sousChefAPI.model.TasteProfileIngredientLinkId;
import com.springboot.sousChefAPI.repository.TPIngredientLinkRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TPIngredientLinkService {

    @Autowired
    private TPIngredientLinkRepository tpIngredientLinkRepository;

    public TasteProfileIngredientLink saveTPAllergyLink(Integer tasteProfileId, Integer ingredientId){
        TasteProfileIngredientLinkId compositeId= new TasteProfileIngredientLinkId();
        compositeId.setTasteProfileId(tasteProfileId);
        compositeId.setIngredientId(ingredientId);

        TasteProfileIngredientLink link = new TasteProfileIngredientLink();
        link.setId(compositeId);

        return tpIngredientLinkRepository.save(link);
    }

    @Transactional
    public void deleteLink(int ingreidentId, int tasteProfileId) {
        TasteProfileIngredientLinkId compositeId = new TasteProfileIngredientLinkId();
        compositeId.setIngredientId(ingreidentId);
        compositeId.setTasteProfileId(tasteProfileId);

        tpIngredientLinkRepository.deleteById(compositeId);
    }
}
