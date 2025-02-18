package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.TasteProfileAllergyLink;
import com.springboot.sousChefAPI.model.TasteProfileAllergyLinkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TPAllergyLinkRepository extends JpaRepository<TasteProfileAllergyLink, TasteProfileAllergyLinkId> {
}
