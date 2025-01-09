import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenubarModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
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
        label: 'My Recipes',
        icon: 'fa-solid fa-star',
        routerLink: 'my-recipes',
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
      { label: 'Account', icon: 'fa-solid fa-user', routerLink: 'account' },
    ];
  }

  isLoggedIn(event: any) {
    if (event?.router?.url == '/login') {
      this.loggedIn = false;
    } else this.loggedIn = true;
  }
}
