package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.TasteProfileIngredientLink;
import com.springboot.sousChefAPI.model.TasteProfileIngredientLinkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TPIngredientLinkRepository extends JpaRepository<TasteProfileIngredientLink, TasteProfileIngredientLinkId> {
}
