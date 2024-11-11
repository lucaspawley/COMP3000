package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.Account;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AccountDAOImpl implements AccountDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Account> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Account> query = currentSession.createQuery("from Account", Account.class);
        return query.getResultList();
    }

    @Override
    public Account get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(Account.class, id);
    }

    @Override
    public void save(Account account) {
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.merge(account);
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Account accountObj = currentSession.get(Account.class, id);
        currentSession.remove(accountObj);
    }
}
