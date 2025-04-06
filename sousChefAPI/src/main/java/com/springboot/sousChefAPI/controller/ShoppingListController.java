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
                Item findItem = itemService.findbyItem(item.getItem());
                if (findItem == null) {
                    itemService.saveItem(item);
                } else {
                    item.setItemId(findItem.getItemId());
                }
            }
        }

        shoppingListService.saveList(shoppingList);
        Integer shoppingListId = shoppingList.getShoppingListId();

        for(Item item : items){
            ItemLink linkExists = itemLinkService.linkExist(item.getItemId(), shoppingListId);
            if (linkExists != null){
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

    @DeleteMapping("/item/delete")
    public void deleteItem(@RequestParam List<Integer> ids, @RequestParam Integer shoppingListId){
        for (Integer id : ids){
            itemLinkService.deleteLink(id, shoppingListId);
        }
    }

    @DeleteMapping("/delete")
    public void deleteList(@RequestBody ShoppingList shoppingList) {
        for (Item item : shoppingList.getItems()) {
            itemLinkService.deleteLink(item.getItemId(), shoppingList.getShoppingListId());
        }

        shoppingListService.deleteShoppingList(shoppingList.getShoppingListId());
    }
}
