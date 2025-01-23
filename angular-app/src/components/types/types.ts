/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2025-01-23 12:20:54.

export class Account implements UserDetails {
    password?: string;
    enabled?: boolean;
    username?: string;
    accountNonLocked?: boolean;
    authorities?: GrantedAuthority[];
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
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
    ingredients?: Ingredient[];
    methods?: Method[];
}

export class Ingredient {
    ingredientName?: string;
    ingredient_id?: number;
}

export interface UserDetails extends Serializable {
    password?: string;
    enabled?: boolean;
    username?: string;
    accountNonLocked?: boolean;
    authorities?: GrantedAuthority[];
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
}

export class DietPreference {
    dietPreferenceId?: number;
    dietPreferenceName?: string;
}

export interface GrantedAuthority extends Serializable {
    authority?: string;
}

export interface Serializable {
}
