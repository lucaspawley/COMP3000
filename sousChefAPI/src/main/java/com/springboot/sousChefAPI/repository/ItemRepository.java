package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Item;
import com.springboot.sousChefAPI.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findByItem(String item);
}
