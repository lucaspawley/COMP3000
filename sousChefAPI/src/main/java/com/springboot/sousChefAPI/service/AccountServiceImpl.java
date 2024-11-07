package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.dao.AccountDAO;
import com.springboot.sousChefAPI.model.Account;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDAO accountDAO;

    @Transactional
    @Override
    public List<Account> get() {
        return  accountDAO.get();
    }

    @Transactional
    @Override
    public Account get(int id) {
        return accountDAO.get(id);
    }

    @Transactional
    @Override
    public void save(Account account) {
        accountDAO.save(account);
    }

    @Transactional
    @Override
    public void delete(int id) {
        accountDAO.delete(id);
    }
}
