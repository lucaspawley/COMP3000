import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccountService } from '../../../services/account.service';
import {
  Account,
  Allergy,
  DietPreference,
  Ingredient,
} from '../../types/types';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TasteProfileService } from '../../../services/taste-profile.service';

@Component({
  selector: 'app-account-page',
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent implements OnInit {
  currentAccount!: Account;

  dietPrefFormControl!: FormControl;
  allergyFormControl!: FormControl;
  dislikedIngredientFormControl!: FormControl;

  dietPreferences: Array<DietPreference> | undefined;
  allergies: Array<Allergy> | undefined;
  dislikedIngredients: Array<Ingredient> | undefined;

  tasteProfileId: string | undefined;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private tasteProfileService: TasteProfileService
  ) {}

  ngOnInit() {
    this.currentAccount = this.accountService.currentAccount!;

    this.dietPrefFormControl = this.fb.control('');
    this.allergyFormControl = this.fb.control('');
    this.dislikedIngredientFormControl = this.fb.control('');

    this.dietPreferences =
      this.accountService.currentAccount?.tasteProfile?.dietPreferences;
    this.allergies =
      this.accountService.currentAccount?.tasteProfile?.allergies;
    this.dislikedIngredients =
      this.accountService.currentAccount?.tasteProfile?.ingredients;

    this.tasteProfileId =
      this.accountService.currentAccount?.tasteProfile?.tasteProfileId?.toString();
  }

  addDietPref() {
    if (this.dietPrefFormControl.value != undefined) {
      const newDietPreference: DietPreference = {
        dietPreferenceId: undefined,
        dietPreferenceName: this.dietPrefFormControl.value,
      };

      this.tasteProfileService
        .addDietPreference(newDietPreference, this.tasteProfileId!)
        .subscribe((result) => {
          this.dietPreferences?.push(result);
          this.dietPrefFormControl.reset();
        });
    }
  }

  addAllergy() {
    if (this.allergyFormControl.value != undefined) {
      const newAllergy: Allergy = {
        allergyId: undefined,
        allergyName: this.allergyFormControl.value,
      };

      this.tasteProfileService
        .addAllergy(newAllergy, this.tasteProfileId!)
        .subscribe((result) => {
          this.allergies?.push(result);
          this.allergyFormControl.reset();
        });
    }
  }

  addIngredient() {
    if (this.dislikedIngredientFormControl.value != undefined) {
      const newIngredient: Ingredient = {
        ingredient_id: undefined,
        ingredientName: this.dislikedIngredientFormControl.value,
      };

      this.tasteProfileService
        .addDislikedIngredient(newIngredient, this.tasteProfileId!)
        .subscribe((result) => {
          this.dislikedIngredients?.push(result);
          this.dislikedIngredientFormControl.reset();
        });
    }
  }

  removeDietPref(dietPref: DietPreference) {
    this.tasteProfileService
      .removeDietPreference(dietPref, this.tasteProfileId!)
      .subscribe(() => {
        this.dietPreferences = this.dietPreferences?.filter(
          (dp) => dp !== dietPref
        );
      });
  }

  removeAllergy(allergy: Allergy) {
    this.tasteProfileService
      .removeAllergy(allergy, this.tasteProfileId!)
      .subscribe(() => {
        this.allergies = this.allergies?.filter((a) => a !== allergy);
      });
  }

  removeIngredient(ingredient: Ingredient) {
    this.tasteProfileService
      .removeDislikedIngredient(ingredient, this.tasteProfileId!)
      .subscribe(() => {
        this.dislikedIngredients = this.dislikedIngredients?.filter((i) => i !== ingredient);
      });
  }
}
