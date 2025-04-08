package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Item;
import com.springboot.sousChefAPI.model.ShoppingList;
import com.springboot.sousChefAPI.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    public void deleteItem(Integer id) {
        itemRepository.deleteById(id);
    }
}
