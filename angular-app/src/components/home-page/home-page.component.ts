import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CarouselModule } from 'primeng/carousel';
import { RecipeService } from '../../services/recipe.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FavouriteRecipe, Recipe } from '../types/types';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-page',
  imports: [CarouselModule, ImageModule, ButtonModule, CardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) {}

  recommendRecipes: Array<Recipe> = [];
  yourRecipes: Array<Recipe> = [];
  highRatedRecipes: Array<Recipe> = [];

  responsiveOptions!: Array<any>;
  responsiveOptionsSmall!: Array<any>;

  ngOnInit(): void {
    const saveData = JSON.parse(sessionStorage.getItem('token') as string);
    this.accountService.currentToken = saveData;

    this.recipeService
      .getRecipeByAccountId(
        JSON.parse(sessionStorage.getItem('accountId') as string)
      )
      .subscribe((result: Recipe) => {
        if (Array.isArray(result)) {
          this.yourRecipes = result.map((recipe) => ({
            ...recipe,
            imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
          }));
        }
      });

    this.recipeService.getRandomRecipes().subscribe((result: Recipe) => {
      if (Array.isArray(result)) {
        this.recommendRecipes = result.map((recipe) => ({
          ...recipe,
          imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
        }));
      }
    });

    this.recipeService.getTopRecipes().subscribe((result: Recipe) => {
      if (Array.isArray(result)) {
        this.highRatedRecipes = result.map((recipe) => ({
          ...recipe,
          imageSafeUrl: this.sanitizeImage(recipe.imageBase64),
        }));
      }
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.responsiveOptionsSmall = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 2,
      },
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  goToRecipe(recipeId: number | undefined) {
    this.router.navigate(['recipe', recipeId]);
  }

  favouriteRecipe(recipeId: number | undefined) {
    let newFav: FavouriteRecipe = {
      favourite_id: undefined,
      recipeId: recipeId,
      accountId: JSON.parse(sessionStorage.getItem('accountId') as string),
    };

    this.recipeService.favouriteRecipe(newFav).subscribe((res) => {
      console.log(res);
    });
  }

  sanitizeImage(base64: string): SafeUrl | null {
    if (base64 != null) {
      return this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64}`
      );
    } else return null;
  }
}
