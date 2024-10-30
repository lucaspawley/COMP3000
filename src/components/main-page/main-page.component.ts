import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  items: Array<MenuItem> | undefined;
  ngOnInit(): void {
    this.items = [
      { label: 'Account', icon: 'fa-regular fa-user', routerLink: 'account', replaceUrl: true },
      { label: 'Find Recipes', icon: 'fa-solid fa-kitchen-set', routerLink: 'find-recipes' },
      { label: 'Favourite Recipes', icon: 'fa-regular fa-star', routerLink: 'favourite-recipes' },
      { label: 'Shopping Lists', icon: 'fa-solid fa-list', routerLink: 'shopping-lists' },
      { label: 'Assistant', icon: 'fa-solid fa-robot', routerLink: 'assistant'}
    ];
  }
}
