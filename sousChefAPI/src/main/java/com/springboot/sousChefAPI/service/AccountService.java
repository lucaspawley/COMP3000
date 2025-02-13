package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.exception.InvalidLoginException;
import com.springboot.sousChefAPI.model.Account;
import com.springboot.sousChefAPI.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(int id) {
        return accountRepository.findById(id);
    }

    public Account saveAccount(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }

    public void deleteAccount(int id) {
        accountRepository.deleteById(id);
    }

    @Override
    public Account loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);

        if (account == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return account;
//        return org.springframework.security.core.userdetails.User
//                .withUsername(account.getUsername())
//                .password(account.getPassword())
//                .roles("USER")
//                .build();
    }

    public String checkLogin(String username, String rawPassword) throws Exception {
        Account account = accountRepository.findByUsername(username);

        if (account == null) {
            throw new InvalidLoginException("Invalid Credentials. Please try again.");
        }

        boolean validPass = passwordEncoder.matches(rawPassword, account.getPassword());

        if (!validPass) {
            throw new InvalidLoginException("Invalid Credentials. Please try again.");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, rawPassword)
        );

        if (!authentication.isAuthenticated()) {
            throw new InvalidLoginException("Invalid Credentials. Please try again.");
        }

        return jwtService.generateToken(account.getUsername());
    }
}

