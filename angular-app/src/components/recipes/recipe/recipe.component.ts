import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { FavouriteRecipe, Recipe, ShoppingList } from '../../types/types';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from '../../../services/shopping-list.service';

@Component({
  selector: 'app-recipe',
  imports: [
    CardModule,
    ImageModule,
    ChipModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | undefined;
  dialogVisible: boolean = false;
  listVisible: boolean = false;

  availableLists: Array<ShoppingList> = [];

  accountId!: number | undefined;

  ratingFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router,
    private listService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.accountId = JSON.parse(sessionStorage.getItem('accountId') as string);
    this.getRecipe();
  }

  sanitizeImage(base64: string): SafeUrl | null {
    if (base64 != null) {
      return this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64}`
      );
    } else return null;
  }

  getRecipe() {
    let recipeId = '';
    this.route.url.subscribe((url) => (recipeId = url[1].path));

    this.recipeService.getRecipe(recipeId).subscribe((result) => {
      this.recipe = {
        ...result,
        imageSafeUrl: this.sanitizeImage(result.imageBase64),
      };
    });

    this.ratingFormGroup = this.fb.group({
      recipeId: recipeId,
      accountId: JSON.parse(sessionStorage.getItem('accountId') as string),
      recipeRating: 0,
    });
  }

  rateRecipe() {
    this.recipeService
      .rateRecipe(this.ratingFormGroup.value)
      .subscribe((result) => {
        this.recipe = {
          ...result,
          imageSafeUrl: this.sanitizeImage(result.imageBase64),
        };
      });
    this.getRecipe();
    this.showDialog();
  }

  showDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  addToList() {}

  editRecipe() {
    this.router.navigate(['recipe', this.recipe!.recipe_id, 'edit']);
  }

  favouriteRecipe() {
    let newFav: FavouriteRecipe = {
      favourite_id: undefined,
      recipeId: this.recipe!.recipe_id!,
      accountId: JSON.parse(sessionStorage.getItem('accountId') as string),
    };

    this.recipeService.favouriteRecipe(newFav).subscribe((res) => {
      console.log(res);
    });
  }

  showAddToList() {
    this.listVisible = !this.listVisible;

    if (this.listVisible) {
      this.listService
        .getShoppingList(this.accountId!.toString())
        .subscribe((result) => {
          this.availableLists = result;
        });
    }
  }

  deleteRecipe() {
    this.recipeService
      .deleteRecipe(this.recipe!)
      .subscribe(() => this.router.navigate(['my-recipes']));
  }
}
