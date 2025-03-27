import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Recipe } from '../../types/types';
import { Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { AccountService } from '../../../services/account.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-my-recipes',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ImageModule,
    ButtonModule,
    CommonModule,
    RecipeCardComponent,
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
})
export class MyRecipesComponent {
  recipes: Array<Recipe> = [];
  favouriteRecipes: Array<Recipe> = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.recipeService
      .getRecipeByAccountId(
        JSON.parse(sessionStorage.getItem('accountId') as string)
      )
      .subscribe((result: Recipe) => {
        if (Array.isArray(result)) {
          this.recipes = result.map((recipe) => ({
            ...recipe,
            imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
          }));
        }
      });

    this.recipeService
      .getFavouriteRecipes(
        JSON.parse(sessionStorage.getItem('accountId') as string)
      )
      .subscribe((result: Recipe) => {
        if (Array.isArray(result)) {
          this.favouriteRecipes = result.map((recipe) => ({
            ...recipe,
            imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
          }));
        }
      });
  }

  sanitizeImage(base64: string): SafeUrl | null {
    if (base64 != null) {
      return this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64}`
      );
    } else return null;
  }

  goToCreateRecipe() {
    this.router.navigate(['create-recipe']);
  }
}
