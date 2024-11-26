import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Account } from '../components/account/types/types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  currentAccount: Account | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('hello');
  }

  login(username: string, password: string) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<any>(`${environment.apiURL}/api/account/login`, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        tap((result) => {
          this.currentAccount = result;
          sessionStorage.setItem('account', JSON.stringify(result));
        })
      );
  }
}
