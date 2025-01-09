import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../types/types';

@Component({
    selector: 'app-find-recipe-page',
    imports: [
        CardModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ImageModule,
        ButtonModule,
        CommonModule,
    ],
    templateUrl: './find-recipe-page.component.html',
    styleUrl: './find-recipe-page.component.scss'
})
export class FindRecipePageComponent implements OnInit {
  recipes: Array<Recipe> | undefined;

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((result: any) => {
      this.recipes = result;
    });
  }

  goToRecipe(recipeId: number | undefined) {
    this.router.navigate([recipeId]);
  }

  favouriteRecipe(recipe: Recipe) {}
}
