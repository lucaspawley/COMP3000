import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccountService } from '../../../services/account.service';
import {
  Account,
  Allergy,
  DietPreference,
  Ingredient,
  TasteProfile,
} from '../../types/types';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TasteProfileService } from '../../../services/taste-profile.service';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-account-page',
  imports: [
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent implements OnInit {
  currentAccount!: Account;
  tasteProfile!: TasteProfile;

  dietPrefFormControl!: FormControl;
  dietPreferenceSuggestions: Array<DietPreference> = [];

  allergyFormControl!: FormControl;
  allergySuggestions: Array<Allergy> = [];

  dislikedIngredientFormControl!: FormControl;
  ingredientsSuggestions: Array<Ingredient> = [];

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
    this.dietPrefFormControl = this.fb.control('');
    this.allergyFormControl = this.fb.control('');
    this.dislikedIngredientFormControl = this.fb.control('');

    this.accountService
      .getUserByAccountId(
        JSON.parse(sessionStorage.getItem('accountId') as string)
      )
      .subscribe((result) => {
        this.currentAccount = result;

        this.dietPreferences =
          this.currentAccount?.tasteProfile?.dietPreferences;
        this.allergies = this.currentAccount?.tasteProfile?.allergies;
        this.dislikedIngredients =
          this.currentAccount?.tasteProfile?.ingredients;

        this.tasteProfileId =
          this.currentAccount?.tasteProfile?.tasteProfileId?.toString();
      });
  }

  addDietPref(dietPref: DietPreference) {
    if (dietPref) {
      let newDietPreference: DietPreference;
      if (dietPref.dietPreferenceName) {
        newDietPreference = dietPref;
      } else {
        newDietPreference = {
          dietPreferenceId: undefined,
          dietPreferenceName: this.dietPrefFormControl.value,
        };
      }

      this.tasteProfileService
        .addDietPreference(newDietPreference, this.tasteProfileId!)
        .subscribe((result) => {
          this.dietPreferences?.push(result);
          this.dietPrefFormControl.reset();
        });
    }
  }

  addAllergy(allergy: Allergy) {
    if (allergy) {
      let newAllergy: Allergy;
      if (allergy.allergyName) {
        newAllergy = allergy;
      } else {
        newAllergy = {
          allergyId: undefined,
          allergyName: this.allergyFormControl.value,
        };
      }

      this.tasteProfileService
        .addAllergy(newAllergy, this.tasteProfileId!)
        .subscribe((result) => {
          this.allergies?.push(result);
          this.allergyFormControl.reset();
        });
    }
  }

  addIngredient(ingredient: Ingredient) {
    if (ingredient) {
      let newIngredient: Ingredient;
      if (ingredient.ingredientName) {
        newIngredient = ingredient;
      } else {
        newIngredient = {
          ingredient_id: undefined,
          ingredientName: this.dislikedIngredientFormControl.value,
        };
      }

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
        this.dislikedIngredients = this.dislikedIngredients?.filter(
          (i) => i !== ingredient
        );
      });
  }

  searchAllergy(event: AutoCompleteCompleteEvent) {
    this.tasteProfileService
      .searchAllergies(event.query)
      .subscribe((results) => {
        this.allergySuggestions = results;
        if (results) {
          this.allergySuggestions = results;
        } else {
          this.allergySuggestions = [];
        }
      });
  }

  searchDietPref(event: AutoCompleteCompleteEvent) {
    this.tasteProfileService
      .searchDietPreference(event.query)
      .subscribe((results) => {
        if (results) {
          this.dietPreferenceSuggestions = results;
        } else {
          this.dietPreferenceSuggestions = [];
        }
      });
  }

  searchIngredient(event: AutoCompleteCompleteEvent) {
    this.tasteProfileService
      .searchIngredient(event.query)
      .subscribe((results) => {
        if (results) {
          this.ingredientsSuggestions = results;
        } else {
          this.ingredientsSuggestions = [];
        }
      });
  }
}
