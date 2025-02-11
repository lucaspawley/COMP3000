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
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss',
})
export class MyRecipesComponent {
  recipes: Array<Recipe> | undefined;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
      this.recipeService
        .getRecipeByAccountId(JSON.parse(sessionStorage.getItem('accountId') as string))
        .subscribe((result: Recipe) => {
          if (Array.isArray(result)) {
            this.recipes = result.map(recipe => ({
              ...recipe,
              imageSafeUrl: this.sanitizeImage(recipe.imageBase64)
            }));
          }
          console.log(this.recipes);
        });
  }

  sanitizeImage(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64}`);
  }

  goToRecipe(recipeId: number | undefined) {
    this.router.navigate([recipeId]);
  }

  goToCreateRecipe() {
    this.router.navigate(['create-recipe']);
  }
}
