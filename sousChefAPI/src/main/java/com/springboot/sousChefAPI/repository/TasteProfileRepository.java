package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.TasteProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasteProfileRepository extends JpaRepository<TasteProfile, Integer> {
}
