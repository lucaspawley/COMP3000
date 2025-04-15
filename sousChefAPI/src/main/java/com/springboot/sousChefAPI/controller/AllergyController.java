package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.service.AllergyService;
import com.springboot.sousChefAPI.service.TPAllergyLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allergy")
public class AllergyController {

    @Autowired
    private AllergyService allergyService;

    @Autowired
    private TPAllergyLinkService allergyLinkService;

    @GetMapping("/")
    public List<Allergy> get() {
        return allergyService.getAllAllergies();
    }

    @PostMapping("/add/{tasteProfileId}")
    public Allergy save(@RequestBody Allergy allergyObj, @PathVariable int tasteProfileId) {
        Allergy newAllergy = allergyService.saveAllergy(allergyObj);
        allergyLinkService.saveTPAllergyLink(tasteProfileId, allergyObj.getAllergyId());

        return newAllergy;
    }

    @GetMapping("/{id}")
    public Allergy get(@PathVariable int id) {
        return allergyService.getAllergyById(id)
                .map(account -> new ResponseEntity<>(account, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();
    }

    @PostMapping("/delete/{tasteProfileId}")
    public void delete(@RequestBody Allergy allergy, @PathVariable int tasteProfileId) {
        allergyLinkService.deleteLink(allergy.getAllergyId(), tasteProfileId);
    }

    @GetMapping("/search")
    public List<Allergy> searchAllergy(@RequestParam String allergyName) {
        return allergyService.searchAllergy(allergyName);
    }
}
