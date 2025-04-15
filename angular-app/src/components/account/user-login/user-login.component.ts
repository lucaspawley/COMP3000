import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AccountService } from '../../../services/account.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import {
  Account,
  Allergy,
  DietPreference,
  Ingredient,
} from '../../types/types';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { TasteProfileService } from '../../../services/taste-profile.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    StepperModule,
    AutoCompleteModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent implements OnInit {
  loginInForm!: FormGroup;
  signUpForm!: FormGroup;
  tasteProfileForm!: FormGroup;

  allergyFormArray!: FormArray;
  allergyFormControl!: FormControl;
  allergySuggestions: Array<Allergy> = [];

  dietPreferenceFormArray!: FormArray;
  dietPreferenceFormControl!: FormControl;
  dietPreferenceSuggestions: Array<DietPreference> = [];

  ingredientsFormArray!: FormArray;
  ingredientsFormControl!: FormControl;
  ingredientsSuggestions: Array<Ingredient> = [];

  signUpMode: boolean = false;
  currentStep: number = 1;
  loginError: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private tasteProfileService: TasteProfileService
  ) {}

  ngOnInit(): void {
    this.loginInForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });

    this.allergyFormArray = this.fb.array([]);
    this.allergyFormControl = this.fb.control('');

    this.dietPreferenceFormArray = this.fb.array([]);
    this.dietPreferenceFormControl = this.fb.control('');

    this.ingredientsFormArray = this.fb.array([]);
    this.ingredientsFormControl = this.fb.control('');

    this.tasteProfileForm = this.fb.group({
      tasteProfileId: new FormControl(null),
      allergies: this.allergyFormArray,
      dietPreferences: this.dietPreferenceFormArray,
      ingredients: this.ingredientsFormArray,
    });

    this.signUpForm = this.fb.group(
      {
        accountId: new FormControl(null),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
      },
      {
        validators: this.confirmPasswordValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  userLogin() {
    this.accountService
      .login(
        this.loginInForm.get('username')?.value,
        this.loginInForm.get('password')?.value
      )
      .subscribe({
        next: (response: string) => {
          if (response !== undefined) {
            this.accountService.currentToken = response;
            sessionStorage.setItem('token', JSON.stringify(response));
            this.accountService
              .getUserByUsername(this.loginInForm.get('username')?.value)
              .subscribe((res: Account) => {
                if (res) {
                  this.accountService.currentAccountId = res.accountId;
                  sessionStorage.setItem(
                    'accountId',
                    JSON.stringify(res.accountId)
                  );
                }
              });
            this.router.navigate(['home']);
          }
        },
        error: (e: HttpErrorResponse) => {
          this.loginError = e.error;
          this.loginInForm.reset();
        },
      });
  }

  confirmPasswordValidator(
    passwordField: string,
    confirmPasswordField: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordField)?.value;
      const confirmPassword = control.get(confirmPasswordField)?.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  changeMode() {
    if (!this.signUpMode) this.signUpForm.reset();
    this.signUpMode = !this.signUpMode;
  }

  addAllergy(allergy: Allergy) {
    if (allergy) {
      let newAllergy;
      if (allergy.allergyName) {
        newAllergy = new FormControl(allergy.allergyName);
      } else {
        newAllergy = new FormControl(allergy);
      }
      this.allergyFormArray.push(newAllergy);
      this.allergyFormControl.reset();
    }
  }

  removeAllergy(allergyIndex: number) {
    this.allergyFormArray.removeAt(allergyIndex);
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

  addDietPref(dietPref: DietPreference) {
    if (dietPref) {
      let newDietPreference;

      if (dietPref.dietPreferenceName) {
        newDietPreference = new FormControl(dietPref.dietPreferenceName);
      } else {
        newDietPreference = new FormControl(dietPref);
      }

      this.dietPreferenceFormArray.push(newDietPreference);
      this.dietPreferenceFormControl.reset();
    }
  }

  removeDietPref(dietPrefIndex: number) {
    this.dietPreferenceFormArray.removeAt(dietPrefIndex);
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

  addIngredient(ingredient: Ingredient) {
    if (ingredient) {
      let newIngredient;

      if (ingredient.ingredientName) {
        newIngredient = new FormControl(ingredient.ingredientName);
      } else {
        newIngredient = new FormControl(ingredient);
      }

      this.ingredientsFormArray.push(newIngredient);
      this.ingredientsFormControl.reset();
    }
  }

  removeIngredient(ingredientIndex: number) {
    this.ingredientsFormArray.removeAt(ingredientIndex);
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

  signUp() {
    if (this.signUpForm.valid) {
      this.signUpForm.removeControl('confirmPassword');

      let newUser: Account = this.signUpForm.value;

      newUser.tasteProfile = {
        tasteProfileId: undefined,
        allergies: [],
        dietPreferences: [],
        ingredients: [],
      };

      this.allergyFormArray.value.forEach((allergy: string) => {
        newUser.tasteProfile?.allergies?.push({
          allergyId: undefined,
          allergyName: allergy,
        });
      });

      this.dietPreferenceFormArray.value.forEach((dietPref: string) => {
        newUser.tasteProfile?.dietPreferences?.push({
          dietPreferenceId: undefined,
          dietPreferenceName: dietPref,
        });
      });

      this.ingredientsFormArray.value.forEach((ingredient: string) => {
        newUser.tasteProfile?.ingredients?.push({
          ingredient_id: undefined,
          ingredientName: ingredient,
        });
      });

      this.accountService.signUp(newUser).subscribe((response) => {
        this.signUpForm.addControl('confirmPassword', new FormControl(''));
        this.changeMode();
      });
    }
  }
}
