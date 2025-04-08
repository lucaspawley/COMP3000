/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2025-02-10 12:24:32.

import { SafeUrl } from "@angular/platform-browser";

export class Account implements UserDetails {
    authorities?: GrantedAuthority[];
    accountNonLocked?: boolean;
    password?: string;
    enabled?: boolean;
    username?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    accountId?: number;
    email?: string;
    tasteProfile?: TasteProfile;
}

export class Allergy {
    allergyId?: number;
    allergyName?: string;
}

export class TasteProfile {
    tasteProfileId?: number;
    allergies?: Allergy[];
    dietPreferences?: DietPreference[];
    ingredients?: Ingredient[];
}

export class Method {
    methodId?: number;
    method_step?: number;
    method_description?: string;
}

export class FavouriteRecipe {
    favourite_id?: number;
    recipeId?: number;
    accountId?: number;
}

export class Recipe {
    map(arg0: (recipe: any) => any): Recipe | undefined {
      throw new Error('Method not implemented.');
    }
    recipe_id?: number;
    recipe_name?: string;
    recipe_rating?: number;
    recipe_serves?: number;
    recipe_prep_time?: number;
    recipe_cook_time?: number;
    imageData?: any;
    imageSafeUrl?: SafeUrl;
    allergies?: Allergy[];
    ingredients?: RecipeIngredient[];
    methods?: Method[];
    accountId?: number;
    imageBase64?: string;
}

export class RecipeRating {
    rating_id?: number;
    recipeId?: number;
    accountId?: number;
    recipeRating?: number;
}

export class Ingredient {
    ingredientName?: string;
    ingredient_id?: number;
}

export interface UserDetails extends Serializable {
    authorities?: GrantedAuthority[];
    accountNonLocked?: boolean;
    password?: string;
    enabled?: boolean;
    username?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
}

export class DietPreference {
    dietPreferenceId?: number;
    dietPreferenceName?: string;
}

export class RecipeIngredient {
    recipe_ingredient_id?: number;
    recipe_ingredient_amount?: number;
    recipe_ingredient_measurement?: string;
    recipe_ingredient_name?: string;
}

export class Item {
    itemId?: number;
    item?: string;
    brought?: boolean;
}

export class ShoppingList {
    shoppingListId?: number;
    list_name?: string;
    accountID?: number;
    items?: Item[];
}

export interface GrantedAuthority extends Serializable {
    authority?: string;
}

export interface Serializable {
}
