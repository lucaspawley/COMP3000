import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ShoppingListCardComponent } from '../shopping-list-card/shopping-list-card.component';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingList } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-lists-page',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ShoppingListCardComponent,
  ],
  templateUrl: './shopping-lists-page.component.html',
  styleUrl: './shopping-lists-page.component.scss',
})
export class ShoppingListsPageComponent implements OnInit {
  shoppingListArray: Array<ShoppingList> = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingListService
      .getShoppingLists(
        JSON.parse(sessionStorage.getItem('accountId') as string)
      )
      .subscribe((result) => {
        this.shoppingListArray = result;
      });
  }

  goToCreateList() {
    this.router.navigate(['list']);
  }
}
