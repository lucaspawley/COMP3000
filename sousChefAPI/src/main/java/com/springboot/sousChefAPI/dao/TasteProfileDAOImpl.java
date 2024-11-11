package com.springboot.sousChefAPI.dao;

import com.springboot.sousChefAPI.model.TasteProfile;
import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TasteProfileDAOImpl implements TasteProfileDAO {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<TasteProfile> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<TasteProfile> query = currentSession.createQuery("from TasteProfile", TasteProfile.class);
        return query.getResultList();
    }

    @Override
    public TasteProfile get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(TasteProfile.class, id);
    }

    @Override
    public void save(TasteProfile tasteProfile) {
        Session currentSession = entityManager.unwrap(Session.class);

        currentSession.merge(tasteProfile);
    }

    @Override
    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        TasteProfile tasteProfileObj = currentSession.get(TasteProfile.class, id);
        currentSession.remove(tasteProfileObj);
    }
}
