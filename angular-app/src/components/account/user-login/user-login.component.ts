import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AccountService } from '../../../services/account.service';
import { Account } from '../types/types';

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
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit {
  loginInForm!: FormGroup;

  currentAccount: Account | undefined;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loginInForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  navigateLogin() {
    this.accountService
      .login(
        this.loginInForm.get('username')?.value,
        this.loginInForm.get('password')?.value
      )
      .subscribe((response) => {
        this.currentAccount = response;
        console.log(response);
        if (response !== undefined) this.router.navigate(['home']);
      });
  }
}
