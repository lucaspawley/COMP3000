package com.springboot.sousChefAPI.controller;

import com.springboot.sousChefAPI.model.Item;
import com.springboot.sousChefAPI.model.ItemLink;
import com.springboot.sousChefAPI.model.ShoppingList;
import com.springboot.sousChefAPI.service.ItemLinkService;
import com.springboot.sousChefAPI.service.ItemService;
import com.springboot.sousChefAPI.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/list")
public class ShoppingListController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private ShoppingListService shoppingListService;

    @Autowired
    private ItemLinkService itemLinkService;

    @PostMapping("/new")
    public ShoppingList save(@RequestBody ShoppingList shoppingList) {
        List<Item> items = shoppingList.getItems();
        for (Item item : items) {
            if (item.getItem() != null) {
                itemService.saveItem(item);
            }
        }

        shoppingListService.saveList(shoppingList);
        Integer shoppingListId = shoppingList.getShoppingListId();

        for (Item item : items) {
            ItemLink linkExists = itemLinkService.linkExist(item.getItemId(), shoppingListId);
            if (linkExists != null) {
                itemLinkService.saveItemLink(item.getItemId(), shoppingListId);
            }
        }

        return shoppingList;
    }

    @GetMapping("/account/{accountID}")
    public List<ShoppingList> getByAccountId(@PathVariable int accountID) {
        return shoppingListService.getShoppingListByAccountId(accountID);
    }

    @GetMapping("/{id}")
    public ShoppingList getShoppingList(@PathVariable int id) {
        return shoppingListService.getShoppingList(id);
    }

    @DeleteMapping("/item/delete/{itemId}/{listId}")
    public void deleteItem(@PathVariable Integer itemId, @PathVariable Integer listId) {
        itemLinkService.deleteLink(itemId, listId);
        itemService.deleteItem(itemId);
    }

    @PostMapping("/item/add/{listId}")
    public ShoppingList saveItem(@PathVariable Integer listId, @RequestBody Item item) {
        Item newItem = itemService.saveItem(item);
        itemLinkService.saveItemLink(newItem.getItemId(), listId);
        return shoppingListService.getShoppingList(listId);
    }

    @DeleteMapping("/delete")
    public void deleteList(@RequestBody ShoppingList shoppingList) {
        for (Item item : shoppingList.getItems()) {
            itemLinkService.deleteLink(item.getItemId(), shoppingList.getShoppingListId());
        }

        shoppingListService.deleteShoppingList(shoppingList.getShoppingListId());
    }
}
