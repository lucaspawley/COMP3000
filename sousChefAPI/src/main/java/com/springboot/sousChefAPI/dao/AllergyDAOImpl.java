package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.Allergy;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AllergyDAOImpl implements AllergyDAO {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Allergy> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Allergy> query = currentSession.createQuery("from Allergy", Allergy.class);
        return query.getResultList();
    }

    @Override
    public Allergy get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(Allergy.class, id);
    }

    @Override
    public void save(Allergy allergy) {
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.merge(allergy);
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Allergy allergyObj = currentSession.get(Allergy.class, id);
        currentSession.remove(allergyObj);
    }
}
