package com.springboot.sousChefAPI.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_link_shopping_list_item")
public class ItemLink {
    @EmbeddedId
    private ItemLinkId id;

    public ItemLinkId getItemLinkId() {
        return id;
    }

    public void setItemLinkId(ItemLinkId id) {
        this.id = id;
    }

    public Integer getItemId() {
        return id.getItemId();
    }

    public void setItemId(Integer itemId) {
        this.setItemId(itemId);
    }

    public Integer getShoppingListId() {
        return id.getShoppingListId();
    }

    public void setShoppingListId(Integer shoppingListId) {
        id.setShoppingListId(shoppingListId);
    }
}
