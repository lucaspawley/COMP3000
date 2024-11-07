package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Account;

import java.util.List;

public interface AccountService {
    List<Account> get();
    Account get(int id);
    void save(Account account);
    void delete(int id);
}
