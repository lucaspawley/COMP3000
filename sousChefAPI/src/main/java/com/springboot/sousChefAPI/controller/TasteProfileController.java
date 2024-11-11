package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.TasteProfile;
import com.springboot.sousChefAPI.service.TasteProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TasteProfileController {

    @Autowired
    private TasteProfileService tasteProfileService;

    @GetMapping("/tasteProfile")
    public List<TasteProfile> get() {
        return tasteProfileService.get();
    }

    @PostMapping("/tasteProfile")
    public TasteProfile save(@RequestBody TasteProfile tasteProfileObj) {
        tasteProfileService.save(tasteProfileObj);
        return tasteProfileObj;
    }

    @GetMapping("/tasteProfile/{id}")
    public TasteProfile get(@PathVariable int id) {
        TasteProfile tasteProfileObj = tasteProfileService.get(id);

        if (tasteProfileObj == null) {
            throw new RuntimeException("Taste Profile with ID " + id + " was not found");
        }
        return tasteProfileService.get(id);

    }

    @DeleteMapping("/tasteProfile/{id}")
    public String delete(@PathVariable int id) {
        tasteProfileService.delete(id);
        return "Taste Profile has been deleted with id: " + id;
    }

    @PutMapping("/tasteProfile")
    public TasteProfile update(@RequestBody TasteProfile tasteProfileObj) {
        tasteProfileService.save(tasteProfileObj);
        return tasteProfileObj;
    }
}
