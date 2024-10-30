import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from '../components/account/user-login/user-login.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserLoginComponent, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'sous-chef';

  loggedIn: boolean = false;

  items: Array<MenuItem> | undefined;

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'fa-solid fa-house', routerLink: 'home' },
      {
        label: 'Find Recipes',
        icon: 'fa-solid fa-kitchen-set',
        routerLink: 'find-recipes',
      },
      {
        label: 'Favourite Recipes',
        icon: 'fa-regular fa-star',
        routerLink: 'favourite-recipes',
      },
      {
        label: 'Shopping Lists',
        icon: 'fa-solid fa-list',
        routerLink: 'shopping-lists',
      },
      {
        label: 'Assistant',
        icon: 'fa-solid fa-robot',
        routerLink: 'assistant',
      },
      { label: 'Account', icon: 'fa-regular fa-user', routerLink: 'account' },
    ];
  }

  test(event: any) {
    if (event?.router?.url == '/login') {
      this.loggedIn = false;
    } else this.loggedIn = true;
  }
}
