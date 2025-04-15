import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Account } from '../components/types/types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentToken: string | undefined;
  currentAccountId: number | undefined;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(
      `${environment.apiURL}/api/account/login`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
        responseType: 'text',
      }
    );
  }

  signUp(newUser: Account): Observable<any> {
    return this.http.post(`${environment.apiURL}/api/account/create`, newUser);
  }

  getUserByAccountId(accountId: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/account/get/${accountId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/account/${username}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token') as string)}`
      ),
    });
  }
}
