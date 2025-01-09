/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2024-11-27 15:18:00.

export class Account implements UserDetails {
    password?: string;
    enabled?: boolean;
    username?: string;
    accountNonLocked?: boolean;
    authorities?: GrantedAuthority[];
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
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
}

export interface GrantedAuthority extends Serializable {
    authority?: string;
}

export interface Serializable {
}
