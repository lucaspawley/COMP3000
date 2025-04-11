import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, tap } from 'rxjs';
import {
  FavouriteRecipe,
  Recipe,
  RecipeRating,
} from '../components/types/types';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/recipes`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  getRecipe(recipeId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/recipe/${recipeId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  getRecipeByAccountId(accountId: number): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/api/recipe/account/${accountId}`,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  createRecipe(recipe: Recipe, file: File | undefined): Observable<any> {
    const formData = new FormData();
    formData.append(
      'recipe',
      new Blob([JSON.stringify(recipe)], { type: 'application/json' })
    );
    if (file) formData.append('image', file);

    return this.http.post(`${environment.apiURL}/api/recipe`, formData, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  rateRecipe(recipeRating: RecipeRating): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/ratings/add`,
      recipeRating,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  getTopRecipes(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/recipe/top`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  getRandomRecipes(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/random`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  getFavouriteRecipes(accountId: number): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/api/recipe/favourite/${accountId}`,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  favouriteRecipe(favouriteRecipe: FavouriteRecipe): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/recipe/favourite`,
      favouriteRecipe,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  deleteIngredient(ingredientId: number, recipeId: number) {
    return this.http.post(
      `${environment.apiURL}/api/ingredient/delete/${ingredientId}`,
      recipeId,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  deleteRecipe(recipe: Recipe) {
    return this.http.post(
      `${environment.apiURL}/api/recipe/delete`,
      recipe,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }
}
