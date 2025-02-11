import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../types/types';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe',
  imports: [CardModule, ImageModule, ChipModule, ButtonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let recipeId = '';
    this.route.url.subscribe((url) => (recipeId = url[0].path));
    this.recipeService.getRecipe(recipeId).subscribe((result) => {
      this.recipe = {
        ...result,
        imageSafeUrl: this.sanitizeImage(result.imageBase64),
      };
      console.log(this.recipe);
    });
  }

  sanitizeImage(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64}`);
  }
  
  rateRecipe() {}

  addToList() {}

  favouriteRecipe() {}
}
