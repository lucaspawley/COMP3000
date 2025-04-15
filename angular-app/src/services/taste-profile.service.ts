import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Allergy, DietPreference, Ingredient } from '../components/types/types';

@Injectable({
  providedIn: 'root',
})
export class TasteProfileService {
  constructor(private http: HttpClient) {}

  addAllergy(allergy: Allergy, tasteProfileId: string): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/allergy/add/${tasteProfileId}`,
      allergy,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  removeAllergy(allergy: Allergy, tasteProfileId: string): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/allergy/delete/${tasteProfileId}`,
      allergy,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  addDietPreference(
    dietPreference: DietPreference,
    tasteProfileId: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/dietPreference/add/${tasteProfileId}`,
      dietPreference,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  removeDietPreference(
    dietPreference: DietPreference,
    tasteProfileId: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/dietPreference/delete/${tasteProfileId}`,
      dietPreference,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  addDislikedIngredient(
    dislikedIngredient: Ingredient,
    tasteProfileId: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/ingredient/add/${tasteProfileId}`,
      dislikedIngredient,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  removeDislikedIngredient(
    dislikedIngredient: Ingredient,
    tasteProfileId: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/ingredient/delete/${tasteProfileId}`,
      dislikedIngredient,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  searchAllergies(allergyName: string): Observable<Array<Allergy>> {
    const params = new HttpParams().set('allergyName', allergyName);
    return this.http.get<Array<Allergy>>(
      `${environment.apiURL}/api/allergy/search`,
      {
        params,
      }
    );
  }

  searchDietPreference(dietPreferenceName: string): Observable<Array<DietPreference>> {
    const params = new HttpParams().set('dietPreferenceName', dietPreferenceName);
    return this.http.get<Array<DietPreference>>(
      `${environment.apiURL}/api/dietPreference/search`,
      {
        params,
      }
    );
  }

  searchIngredient(ingredientName: string): Observable<Array<Ingredient>> {
    const params = new HttpParams().set('ingredientName', ingredientName);
    return this.http.get<Array<Ingredient>>(
      `${environment.apiURL}/api/ingredient/search`,
      {
        params,
      }
    );
  }
}
