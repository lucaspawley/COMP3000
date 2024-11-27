package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.RecipeMethodLink;
import com.springboot.sousChefAPI.model.RecipeMethodLinkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeMethodLinkRepository extends JpaRepository<RecipeMethodLink, Integer> {
    RecipeMethodLink findById(RecipeMethodLinkId id);
}
