package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.DietPreference;
import com.springboot.sousChefAPI.service.DietPreferenceService;
import com.springboot.sousChefAPI.service.TPDietPreferenceLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DietPreferenceController {

    @Autowired
    private DietPreferenceService dietPreferenceService;

    @Autowired
    private TPDietPreferenceLinkService dietPreferenceLinkService;

    @GetMapping("/dietPreference")
    public List<DietPreference> get() {
        return dietPreferenceService.getAllDietPreference();
    }

    @PostMapping("/dietPreference/{tasteProfileId}")
    public DietPreference save(@RequestBody DietPreference dietPreferenceObj, @PathVariable int tasteProfileId) {
        DietPreference newDietPref = dietPreferenceService.saveDietPreference(dietPreferenceObj);
        dietPreferenceLinkService.saveTPDietPreferenceLink(newDietPref.getDietPreferenceId(), tasteProfileId);

        return newDietPref;
    }

    @PostMapping("/dietPreference/delete/{tasteProfileId}")
    public void delete(@RequestBody DietPreference dietPreferenceObj, @PathVariable int tasteProfileId) {
        dietPreferenceLinkService.deleteLink(dietPreferenceObj.getDietPreferenceId(), tasteProfileId);
    }
}
