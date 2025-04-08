package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.ItemLink;
import com.springboot.sousChefAPI.model.ItemLinkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemLinkRepository extends JpaRepository<ItemLink, Integer> {
    ItemLink findById(ItemLinkId id);
    void deleteById(ItemLinkId id);
}
