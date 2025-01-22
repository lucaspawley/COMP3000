package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.TasteProfileDietPreferenceLink;
import com.springboot.sousChefAPI.model.TasteProfileDietPreferenceLinkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TPDietPreferenceLinkRepository extends JpaRepository<TasteProfileDietPreferenceLink, TasteProfileDietPreferenceLinkId> {
}
