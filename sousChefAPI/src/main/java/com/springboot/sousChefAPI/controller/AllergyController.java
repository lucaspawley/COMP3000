package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.service.AllergyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AllergyController {

    @Autowired
    private AllergyService allergyService;

    @GetMapping("/allergy")
    public List<Allergy> get() {
        return allergyService.getAllAllergies();
    }

    @PostMapping("/allergy")
    public Allergy save(@RequestBody Allergy allergyObj) {
        allergyService.saveAllergy(allergyObj);
        return allergyObj;
    }

    @GetMapping("/allergy/{id}")
    public Allergy get(@PathVariable int id) {
        return allergyService.getAllergyById(id)
                .map(account -> new ResponseEntity<>(account, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();
    }

    @DeleteMapping("/allergy/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id) {
        allergyService.deleteAllergy(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/allergy")
    public Allergy update(@PathVariable int id, @RequestBody Allergy allergy) {
        allergy.setAllergyId(id);
        Allergy updatedAllergy = allergyService.saveAllergy(allergy);
        return new ResponseEntity<>(updatedAllergy, HttpStatus.OK).getBody();
    }
}
