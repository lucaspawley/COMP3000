package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_shopping_list")
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shoppingListId;

    @Column(name = "shopping_list_name")
    private String list_name;

    @Column(name = "accountId")
    private Integer accountID;

    @ManyToMany
    @JoinTable(name = "tbl_link_shopping_list_item",
            joinColumns = @JoinColumn(name = "shopping_list_id"), inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<Item> items = new ArrayList<>();

    public Integer getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(Integer shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public String getList_name() {
        return list_name;
    }

    public void setList_name(String list_name) {
        this.list_name = list_name;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public Integer getAccountID() {
        return accountID;
    }

    public void setAccountID(Integer accountID) {
        this.accountID = accountID;
    }
}
