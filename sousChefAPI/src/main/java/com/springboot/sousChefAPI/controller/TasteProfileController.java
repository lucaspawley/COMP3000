package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.TasteProfile;
import com.springboot.sousChefAPI.service.TasteProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TasteProfileController {

    @Autowired
    private TasteProfileService tasteProfileService;

    @GetMapping("/tasteProfile")
    public List<TasteProfile> get() {
        return tasteProfileService.getAllTasteProfiles();
    }

    @PostMapping("/tasteProfile")
    public TasteProfile save(@RequestBody TasteProfile tasteProfileObj) {
        tasteProfileService.saveTasteProfile(tasteProfileObj);
        return tasteProfileObj;
    }

    @GetMapping("/tasteProfile/{id}")
    public TasteProfile get(@PathVariable int id) {
        return tasteProfileService.getTasteProfileById(id).map(account -> new ResponseEntity<>(account, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();

    }

    @DeleteMapping("/tasteProfile/{id}")
    public ResponseEntity<TasteProfile> delete(@PathVariable int id) {
        tasteProfileService.deleteTasteProfile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/tasteProfile")
    public TasteProfile update(@PathVariable int id, @RequestBody TasteProfile tasteProfile) {
        tasteProfile.setTasteProfileId(id);
        TasteProfile updatedTasteProfile = tasteProfileService.saveTasteProfile(tasteProfile);
        return new ResponseEntity<>(updatedTasteProfile, HttpStatus.OK).getBody();
    }
}
