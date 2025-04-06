package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer> {
    List<ShoppingList> findByAccountID(int accountID);
    ShoppingList getListByshoppingListId(int shoppingListId);
}
