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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  styleUrl: './find-recipe-page.component.scss',
})
export class FindRecipePageComponent implements OnInit {
  recipes: Array<Recipe> | undefined;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((result: any) => {
      if (Array.isArray(result)) {
        this.recipes = result.map(recipe => ({
          ...recipe,
          imageSafeUrl: this.sanitizeImage(recipe.imageBase64)
        }));
      }
    });
  }

  sanitizeImage(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64}`);
  }


  goToRecipe(recipeId: number | undefined) {
    this.router.navigate([recipeId]);
  }

  favouriteRecipe(recipe: Recipe) {}
}
