package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Allergy;
import com.springboot.sousChefAPI.service.AllergyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AllergyController {

    @Autowired
    private AllergyService allergyService;

    @GetMapping("/allergy")
    public List<Allergy> get() {
        return allergyService.get();
    }

    @PostMapping("/allergy")
    public Allergy save(@RequestBody Allergy allergyObj) {
        allergyService.save(allergyObj);
        return allergyObj;
    }

    @GetMapping("/tasteProfile/{id}")
    public Allergy get(@PathVariable int id) {
        Allergy allergyObj = allergyService.get(id);

        if(allergyObj == null) {
            throw new RuntimeException("Allergy with ID " + id + " was not found");
        }

        return allergyService.get(id);
    }

    @DeleteMapping("/allergy/{id}")
    public String delete(@PathVariable int id) {
        allergyService.delete(id);
        return "Allergy has been deleted with id: " + id;
    }

    @PutMapping("/tasteProfile")
    public Allergy update(@RequestBody Allergy allergyObj) {
        allergyService.save(allergyObj);
        return allergyObj;
    }
}
