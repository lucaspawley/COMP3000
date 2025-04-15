package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.DietPreference;
import com.springboot.sousChefAPI.service.DietPreferenceService;
import com.springboot.sousChefAPI.service.TPDietPreferenceLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dietPreference")
public class DietPreferenceController {

    @Autowired
    private DietPreferenceService dietPreferenceService;

    @Autowired
    private TPDietPreferenceLinkService dietPreferenceLinkService;

    @GetMapping("/")
    public List<DietPreference> get() {
        return dietPreferenceService.getAllDietPreference();
    }

    @PostMapping("/add/{tasteProfileId}")
    public DietPreference save(@RequestBody DietPreference dietPreferenceObj, @PathVariable int tasteProfileId) {
        DietPreference newDietPref = dietPreferenceService.saveDietPreference(dietPreferenceObj);
        dietPreferenceLinkService.saveTPDietPreferenceLink(tasteProfileId, newDietPref.getDietPreferenceId());

        return newDietPref;
    }

    @PostMapping("/delete/{tasteProfileId}")
    public void delete(@RequestBody DietPreference dietPreferenceObj, @PathVariable int tasteProfileId) {
        dietPreferenceLinkService.deleteLink(dietPreferenceObj.getDietPreferenceId(), tasteProfileId);
    }

    @GetMapping("/search")
    public List<DietPreference> searchDietPreference(@RequestParam String dietPreferenceName) {
        return dietPreferenceService.searchDietPreference(dietPreferenceName);
    }
}
