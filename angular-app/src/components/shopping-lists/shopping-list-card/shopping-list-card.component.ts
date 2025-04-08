import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ShoppingList } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list-card',
  imports: [CardModule, ButtonModule, ImageModule],
  templateUrl: './shopping-list-card.component.html',
  styleUrl: './shopping-list-card.component.scss'
})
export class ShoppingListCardComponent {
  @Input()
  shoppingLists: Array<ShoppingList> = [];

  constructor(private router: Router){}

  goToList(shoppingListId: number | undefined) {
    this.router.navigate(['list', shoppingListId]);
  }
}
