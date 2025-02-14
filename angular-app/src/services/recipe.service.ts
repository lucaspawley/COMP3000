import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Recipe, RecipeRating } from '../components/types/types';

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

  createRecipe(recipe: Recipe, file: File): Observable<any> {
    const formData = new FormData();
    formData.append(
      'recipe',
      new Blob([JSON.stringify(recipe)], { type: 'application/json' })
    );
    formData.append('image', file);

    return this.http.post(`${environment.apiURL}/api/recipe`, formData, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  rateRecipe(RecipeRating: RecipeRating): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/ratings/add`,
      RecipeRating,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }
}
