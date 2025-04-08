import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Item, ShoppingList } from '../components/types/types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  getShoppingLists(accountId: string): Observable<any> {
    return this.http.get(
      `${environment.apiURL}/api/list/account/${accountId}`,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  getShoppingList(shoppingListId: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/list/${shoppingListId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  saveShoppingList(shoppingList: ShoppingList): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/list/new`, shoppingList, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  addItem(listId: Number, item: Item): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/list/item/add/${listId}`,
      item,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  deleteItem(listId: Number, item: Item): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/list/item/delete/${listId}`,
      item,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }

  deleteList(list: ShoppingList): Observable<any> {
    return this.http.post(
      `${environment.apiURL}/api/list/delete`,
      list,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
        ),
      }
    );
  }
}
