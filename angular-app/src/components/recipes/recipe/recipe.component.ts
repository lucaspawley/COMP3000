import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../types/types';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from '../../../services/account.service';

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

  ratingFormGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private accountService: AccountService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  sanitizeImage(base64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64,${base64}`
    );
  }

  getRecipe() {
    let recipeId = '';
    this.route.url.subscribe((url) => (recipeId = url[0].path));

    this.recipeService.getRecipe(recipeId).subscribe((result) => {
      this.recipe = {
        ...result,
        imageSafeUrl: this.sanitizeImage(result.imageBase64),
      };
    });

    this.ratingFormGroup = this.fb.group({
      recipeId: recipeId,
      accountId: this.accountService.currentAccountId,
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

  favouriteRecipe() {}
}
