package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.model.DietPreference;
import com.springboot.sousChefAPI.model.Ingredient;
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

    @Autowired
    private AllergyService allergyService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private DietPreferenceService dietPreferenceService;

    @Autowired
    private TPAllergyLinkService tpAllergyLinkService;

    public List<TasteProfile> getAllTasteProfiles() {
        return tasteProfileRepository.findAll();
    }

    public Optional<TasteProfile> getTasteProfileById(int id) {
        return tasteProfileRepository.findById(id);
    }

    public TasteProfile saveTasteProfile(TasteProfile tasteProfile) {

        List<Allergy> allergies = tasteProfile.getAllergies();
        for (Allergy allergy : allergies) {
            if (allergy.getAllergyName() != null) {
                Allergy findAllergy = allergyService.findByAllergyName(allergy.getAllergyName());
                if (findAllergy == null) {
                    allergyService.saveAllergy(allergy);
                } else {
                    allergy.setAllergyId(findAllergy.getAllergyId());
                }
            }
        }

        List<Ingredient> ingredients = tasteProfile.getIngredients();
        for (Ingredient ingredient : ingredients) {
            if (ingredient.getIngredientName() != null) {
                Ingredient findIngredient = ingredientService.findByName(ingredient.getIngredientName());
                if (findIngredient == null) {
                    ingredientService.saveIngredient(ingredient);
                } else {
                    ingredient.setIngredient_id(findIngredient.getIngredient_id());
                }
            }
        }

        List<DietPreference> dietPreferences = tasteProfile.getDietPreferences();
        for (DietPreference dietPreference : dietPreferences) {
            if (dietPreference.getDietPreferenceName() != null) {
                DietPreference findDietPreference = dietPreferenceService.findByDietPreferenceName(dietPreference.getDietPreferenceName());
                if (findDietPreference == null) {
                    dietPreferenceService.saveDietPreference(dietPreference);
                } else {
                    dietPreference.setDietPreferenceId(findDietPreference.getDietPreferenceId());
                }
            }
        }

        return tasteProfileRepository.save(tasteProfile);
    }

    public void deleteTasteProfile(int id) {
        tasteProfileRepository.deleteById(id);
    }
}
