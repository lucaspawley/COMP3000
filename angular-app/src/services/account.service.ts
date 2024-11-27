import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentToken: string | undefined;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post(`${environment.apiURL}/api/account/login`, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
        responseType: 'text',
      })
      .pipe(
        tap((result) => {
          this.currentToken = result;
          sessionStorage.setItem('token', JSON.stringify(result));
        })
      );
  }
}
