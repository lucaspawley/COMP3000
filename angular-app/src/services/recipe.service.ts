import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getAllRecipes() {
    return this.http
      .get(`${environment.apiURL}/api/recipes`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      })
      .pipe(tap(() => {}));
  }

  getRecipe(recipeId: string) {
    return this.http
      .get(`${environment.apiURL}/api/recipes` + recipeId, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      })
      .pipe(tap(() => {}));
  }
}
