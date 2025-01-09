import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit {
  loginInForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loginInForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  userLogin() {
    this.accountService
      .login(
        this.loginInForm.get('username')?.value,
        this.loginInForm.get('password')?.value
      )
      .subscribe((response) => {
        console.log(response);
        if (response !== undefined) {
          this.accountService.currentToken = response;
          sessionStorage.setItem('token', JSON.stringify(response));
          this.router.navigate(['home']);
        }
      });
  }

  signUp() {
    this.accountService
      .signUp({
        accountId: undefined,
        username: this.loginInForm.get('username')?.value,
        password: this.loginInForm.get('password')?.value,
        email: 'email1',
        tasteProfile: {
          tasteProfileId: undefined,
          allergies: [],
        },
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
