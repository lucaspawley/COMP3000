import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../types/types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-recipe-page',
  imports: [
    CardModule,
    ImageModule,
    ButtonModule,
    CommonModule,
    RecipeCardComponent,
    AutoCompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './find-recipe-page.component.html',
  styleUrl: './find-recipe-page.component.scss',
})
export class FindRecipePageComponent implements OnInit {
  recipes: Array<Recipe> = [];

  recipeFormControl!: FormControl;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipeFormControl = this.fb.control('');

    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe((result: any) => {
      if (Array.isArray(result)) {
        this.recipes = result.map((recipe) => ({
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

  goToRecipe(recipeId: number | undefined) {
    this.router.navigate([recipeId]);
  }

  onSelect(event: any) {
    this.recipeService
      .searchRecipes(event.value.recipe_name)
      .subscribe((result) => {
        if (result) {
          if (Array.isArray(result)) {
            this.recipes = result.map((recipe) => ({
              ...recipe,
              imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
            }));
          }
        } else {
          this.recipes = [];
        }
      });
  }

  onClear() {
    this.getRecipes();
  }

  searchRecipe(event: AutoCompleteCompleteEvent) {
    this.recipeService.searchRecipes(event.query).subscribe((result) => {
      if (result) {
        if (Array.isArray(result)) {
          this.recipes = result.map((recipe) => ({
            ...recipe,
            imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
          }));
        }
      } else {
        this.recipes = [];
      }
    });
  }
}
