import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { Recipe } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [CardModule, ButtonModule, ImageModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input()
  recipes: Array<Recipe> = [];

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

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
}
