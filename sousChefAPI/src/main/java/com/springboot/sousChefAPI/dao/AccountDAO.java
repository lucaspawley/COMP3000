package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.Account;

import java.util.List;

public interface AccountDAO {
    List<Account> get();
    Account get(int id);
    void save(Account account);
    void delete(int id);
}
