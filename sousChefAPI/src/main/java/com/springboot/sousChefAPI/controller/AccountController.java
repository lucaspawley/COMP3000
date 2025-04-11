package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.*;
import com.springboot.sousChefAPI.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TasteProfileService tasteProfileService;

    @Autowired
    private TPAllergyLinkService tpAllergyLinkService;

    @Autowired
    private TPIngredientLinkService tpIngredientLinkService;

    @Autowired
    private TPDietPreferenceLinkService tpDietPreferenceLinkService;

    @GetMapping("/account")
    public List<Account> get() {
        return accountService.getAllAccounts();
    }

    @PostMapping("/account/create")
    public Account save(@RequestBody Account accountObj) {
        TasteProfile tasteProfile = accountObj.getTasteProfile();

        accountObj.setTasteProfile(tasteProfile);
        tasteProfileService.saveTasteProfile(tasteProfile);

        for (Allergy allergy : tasteProfile.getAllergies()) {
            tpAllergyLinkService.saveTPAllergyLink(tasteProfile.getTasteProfileId(), allergy.getAllergyId());
        }

        for (Ingredient ingredient : tasteProfile.getIngredients()) {
            tpIngredientLinkService.saveTPingredientLink(tasteProfile.getTasteProfileId(), ingredient.getIngredient_id());
        }

        for (DietPreference dietPreference : tasteProfile.getDietPreferences()) {
            tpDietPreferenceLinkService.saveTPDietPreferenceLink(tasteProfile.getTasteProfileId(), dietPreference.getDietPreferenceId());
        }

        accountService.saveAccount(accountObj);
        return accountObj;
    }

//    @GetMapping("/account/{id}")
//    public Account get(@PathVariable int id) {
//        return accountService.getAccountById(id)
//                .map(account -> new ResponseEntity<>(account, HttpStatus.OK))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)).getBody();
//
//    }

    @GetMapping("/account/{username}")
    public Account getByUsername(@PathVariable String username) {
        return accountService.loadUserByUsername(username);
    }

    @DeleteMapping("/account/{id}")
    public ResponseEntity<Account> delete(@PathVariable int id) {
        accountService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/account")
    public Account update(@PathVariable int id, @RequestBody Account account) {
        account.setAccountId(id);
        Account updatedAccount = accountService.saveAccount(account);
        return new ResponseEntity<>(updatedAccount, HttpStatus.OK).getBody();
    }

    @PostMapping("/account/login")
    public String login(@RequestParam String username, @RequestParam String password) throws Exception {
        return accountService.checkLogin(username, password);
    }
}
