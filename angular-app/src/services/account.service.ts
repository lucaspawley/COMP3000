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

  signUp(newUser: Account): Observable<Account> {
    return this.http.post(`${environment.apiURL}/api/account/create`, newUser);
  }
}
