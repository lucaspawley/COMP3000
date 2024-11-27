import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../account/types/types';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CardModule, ImageModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    let recipeId = '';
    this.route.url.subscribe((url) => (recipeId = url[0].path));
    this.recipeService.getRecipe(recipeId).subscribe((result) => {
      this.recipe = result;
      console.log(this.recipe);
    });
  }
}
