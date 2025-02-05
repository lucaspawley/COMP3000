import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../components/types/types';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/api/recipes`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      });
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.http
      .get(`${environment.apiURL}/api/recipe/${recipeId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      });
  }

  getRecipeByAccountId(accountId: number): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/api/recipe/account/${accountId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      });
  } 
}
