import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Item, ShoppingList } from '../../types/types';
import { ShoppingListService } from '../../../services/shopping-list.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-shopping-list',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit {
  shoppingListId!: string;
  shoppingList: ShoppingList | undefined;

  shoppingListFormGroup!: FormGroup;
  itemFormGroup!: FormGroup;
  itemFormArray!: FormArray;

  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private listService: ShoppingListService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url[1] != undefined) {
        this.shoppingListId = url[1].path;
      } else this.editMode = true;
    });

    this.itemFormGroup = this.fb.group({
      item: '',
    });

    this.itemFormArray = this.fb.array([]);

    this.shoppingListFormGroup = this.fb.group({
      shoppingListId: null,
      list_name: '',
      accountID: JSON.parse(sessionStorage.getItem('accountId') as string),
      items: this.itemFormArray,
    });

    if (!this.editMode) this.getList();
  }

  getList() {
    this.listService
      .getShoppingList(this.shoppingListId)
      .subscribe((result) => {
        this.shoppingList = result;

        this.shoppingList?.items?.forEach((item) => {
          this.itemFormArray.push(
            this.fb.group({
              itemId: item.itemId,
              item: item.item,
              brought: item.brought,
            })
          );
        });

        this.shoppingListFormGroup.setValue(result);
      });
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  saveList() {
    this.editMode = false;
    const newList: ShoppingList = this.shoppingListFormGroup.value;

    this.listService.saveShoppingList(newList).subscribe((result) => {
      this.shoppingList = result;
    });
  }

  addToArray() {
    let newItem: Item = {
      itemId: undefined,
      item: this.itemFormGroup.get('item')?.value,
      brought: false,
    };

    this.itemFormArray.push(
      this.fb.group({
        itemId: undefined,
        item: this.itemFormGroup.get('item')?.value,
        brought: false,
      })
    );

    this.listService
      .addItem(this.shoppingList!.shoppingListId!, newItem)
      .subscribe((result) => {
        this.shoppingList = result;

        this.itemFormArray = this.fb.array([]);

        this.shoppingList?.items?.forEach((item) => {
          this.itemFormArray.push(
            this.fb.group({
              itemId: item.itemId,
              item: item.item,
              brought: item.brought,
            })
          );
        });
      });

    this.itemFormGroup.reset();
  }

  deleteItem(item: Item, itemIndex: number) {
    this.listService
      .deleteItem(this.shoppingList!.shoppingListId!, item)
      .subscribe(() => this.itemFormArray.removeAt(itemIndex));
  }

  deleteList() {
    this.listService.deleteList(this.shoppingList!).subscribe(() => {
      this.router.navigate(['shopping-lists']);
    });
  }
}
