package com.springboot.sousChefAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ItemLinkId implements Serializable {
    @Column(name = "item_id")
    private Integer itemId;
    @Column(name = "shopping_list_id")
    private Integer shoppingListId;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(Integer shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemLinkId that = (ItemLinkId) o;
        return Objects.equals(itemId, that.itemId) &&
                Objects.equals(shoppingListId, that.shoppingListId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, shoppingListId);
    }
}
