/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2025-02-05 12:03:00.

export class Account implements UserDetails {
    enabled?: boolean;
    username?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    authorities?: GrantedAuthority[];
    accountNonLocked?: boolean;
    password?: string;
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

export class Recipe {
    recipe_id?: number;
    recipe_name?: string;
    recipe_rating?: number;
    recipe_serves?: number;
    recipe_prep_time?: number;
    recipe_cook_time?: number;
    allergies?: Allergy[];
    ingredients?: RecipeIngredient[];
    methods?: Method[];
    accountId?: number;
}

export class Ingredient {
    ingredientName?: string;
    ingredient_id?: number;
}

export interface UserDetails extends Serializable {
    enabled?: boolean;
    username?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    authorities?: GrantedAuthority[];
    accountNonLocked?: boolean;
    password?: string;
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

export interface GrantedAuthority extends Serializable {
    authority?: string;
}

export interface Serializable {
}
