package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.ShoppingList;
import com.springboot.sousChefAPI.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    public ShoppingList saveList(ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    public List<ShoppingList> getShoppingListByAccountId(int id) {
        return shoppingListRepository.findByAccountID(id);
    }

    public ShoppingList getShoppingList(int id) {return shoppingListRepository.getListByshoppingListId(id);}

    public void deleteShoppingList(int id) {
        shoppingListRepository.deleteById(id);
    }
}
