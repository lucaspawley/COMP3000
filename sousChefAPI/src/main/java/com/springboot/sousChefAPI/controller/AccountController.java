package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Account;
import com.springboot.sousChefAPI.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/account")
    public List<Account> get() {
        return accountService.get();
    }

    @PostMapping("/account")
    public Account save(@RequestBody Account accountObj) {
        accountService.save(accountObj);
        return accountObj;
    }

    @GetMapping("/account/{id}")
    public Account get(@PathVariable int id) {
        Account accountObj = accountService.get(id);

        if (accountObj == null) {
            throw new RuntimeException("Account with ID " + id + " was not found");
        }
        return accountService.get(id);

    }

    @DeleteMapping("/account/{id}")
    public String delete(@PathVariable int id) {
        accountService.delete(id);
        return "Account has been deleted with id: " + id;
    }

    @PutMapping("/account")
    public Account update(@RequestBody Account accountObj) {
        accountService.save(accountObj);
        return accountObj;
    }
}
