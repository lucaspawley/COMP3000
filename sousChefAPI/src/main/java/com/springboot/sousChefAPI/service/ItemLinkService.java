package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.ItemLink;
import com.springboot.sousChefAPI.model.ItemLinkId;
import com.springboot.sousChefAPI.repository.ItemLinkRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemLinkService {
    @Autowired
    private ItemLinkRepository repository;

    public ItemLink saveItemLink(int itemId, int listId) {
        ItemLinkId compositeId = new ItemLinkId();
        compositeId.setShoppingListId(listId);
        compositeId.setItemId(itemId);

        ItemLink link = new ItemLink();
        link.setItemLinkId(compositeId);

        return repository.save(link);
    }

    public ItemLink linkExist(int itemId, int listId) {
        ItemLinkId compositeId = new ItemLinkId();
        compositeId.setItemId(itemId);
        compositeId.setShoppingListId(listId);

        return repository.findById(compositeId);
    }

    @Transactional
    public void deleteLink(int itemId, int listId) {
        ItemLinkId compositeId = new ItemLinkId();
        compositeId.setItemId(itemId);
        compositeId.setShoppingListId(listId);

        repository.deleteById(compositeId);
    }
}
