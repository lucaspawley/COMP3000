package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.DietPreference;
import com.springboot.sousChefAPI.service.DietPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DietPreferenceController {

    @Autowired
    private DietPreferenceService dietPreferenceService;

    @GetMapping("/dietPreference")
    public List<DietPreference> get() {
        return dietPreferenceService.getAllDietPreference();
    }

    @PostMapping("/dietPreference")
    public DietPreference save(@RequestBody DietPreference dietPreferenceObj) {
        dietPreferenceService.saveDietPreference(dietPreferenceObj);
        return dietPreferenceObj;
    }

//    @GetMapping("/allergy/{id}")
//    public Allergy get(@PathVariable int id) {
//        return allergyService.getAllergyById(id)
//                .map(account -> new ResponseEntity<>(account, HttpStatus.OK))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();
//    }
//
//    @DeleteMapping("/allergy/{id}")
//    public ResponseEntity<Object> delete(@PathVariable int id) {
//        allergyService.deleteAllergy(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @PutMapping("/allergy")
//    public Allergy update(@PathVariable int id, @RequestBody Allergy allergy) {
//        allergy.setAllergyId(id);
//        Allergy updatedAllergy = allergyService.saveAllergy(allergy);
//        return new ResponseEntity<>(updatedAllergy, HttpStatus.OK).getBody();
//    }
}
