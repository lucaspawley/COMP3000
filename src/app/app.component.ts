import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from '../components/account/user-login/user-login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sous-chef';
}
