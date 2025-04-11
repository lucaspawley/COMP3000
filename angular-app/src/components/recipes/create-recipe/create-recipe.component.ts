import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RecipeService } from '../../../services/recipe.service';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { TextareaModule } from 'primeng/textarea';
import { FormControlPipe } from '../../../pipes/form-control.pipe';
import { ChipModule } from 'primeng/chip';
import { Ingredient, Recipe } from '../../types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { FileUploadModule } from 'primeng/fileupload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-recipe',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ImageModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    TextareaModule,
    CdkDrag,
    CdkDropList,
    FormControlPipe,
    CdkDragHandle,
    ChipModule,
    FileUploadModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  recipeCreationForm!: FormGroup;
  recipeImage!: File;

  recipe: Recipe | undefined;
  recipeId: string | undefined;

  allergyFormArray!: FormArray;
  allergyFormControl!: FormControl;

  recipeIngredientsFormArray!: FormArray;
  recipeIngredientFormGroup!: FormGroup;

  methodFormArray!: FormArray;
  methodFormGroup!: FormGroup;

  methodSteps: number = 2;

  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.url.subscribe((url) => {
      if (url[2]?.path == 'edit') {
        this.editMode = true;
      }

      this.recipeId = url[1]?.path;
    });

    this.allergyFormArray = this.fb.array([]);
    this.allergyFormControl = this.fb.control('');

    this.recipeIngredientsFormArray = this.fb.array([]);
    this.recipeIngredientFormGroup = this.fb.group({
      recipe_ingredient_id: null,
      recipe_ingredient_amount: 0,
      recipe_ingredient_measurement: '',
      recipe_ingredient_name: '',
    });

    this.methodFormArray = this.fb.array([]);

    if (!this.editMode)
      this.methodFormArray.push(
        this.fb.group({
          methodId: null,
          method_step: 1,
          method_description: '',
        })
      );

    this.methodFormGroup = this.fb.group({
      methodId: null,
      method_step: this.methodSteps,
      method_description: '',
    });

    this.recipeCreationForm = this.fb.group({
      recipe_name: '',
      recipe_cook_time: 0,
      recipe_prep_time: 0,
      recipe_serves: 0,
      recipe_rating: 0,
      allergies: this.allergyFormArray,
      ingredients: this.recipeIngredientsFormArray,
      methods: this.methodFormArray,
      accountId: JSON.parse(sessionStorage.getItem('accountId') as string),
    });

    if (this.editMode) {
      await this.recipeService.getRecipe(this.recipeId!).subscribe((result) => {
        this.recipe = {
          ...result,
          imageSafeUrl: this.sanitizeImage(result.imageBase64),
        };

        this.recipeCreationForm = this.fb.group({
          recipe_id: this.recipe?.recipe_id,
          recipe_name: this.recipe?.recipe_name,
          recipe_cook_time: this.recipe?.recipe_cook_time,
          recipe_prep_time: this.recipe?.recipe_prep_time,
          recipe_serves: this.recipe?.recipe_serves,
          recipe_rating: this.recipe?.recipe_rating,
          imageBase64: this.recipe?.imageBase64,
          imageData: this.recipe?.imageData,
          allergies: this.allergyFormArray,
          ingredients: this.recipeIngredientsFormArray,
          methods: this.methodFormArray,
          accountId: JSON.parse(sessionStorage.getItem('accountId') as string),
        });

        this.recipe?.ingredients?.forEach((ingredient) => {
          this.recipeIngredientsFormArray.push(
            this.fb.group({
              recipe_ingredient_id: ingredient.recipe_ingredient_id,
              recipe_ingredient_name: ingredient.recipe_ingredient_name,
              recipe_ingredient_amount: ingredient.recipe_ingredient_amount,
              recipe_ingredient_measurement:
                ingredient.recipe_ingredient_measurement,
            })
          );
        });

        this.recipe?.methods?.forEach((method) => {
          this.methodFormArray.push(
            this.fb.group({
              methodId: method.methodId,
              method_step: method.method_step,
              method_description: method.method_description,
            })
          );
        });

        this.recipe?.allergies?.forEach((allergy) => {
          this.allergyFormArray.push(
            this.fb.group({
              allergyId: allergy.allergyId,
              allergyName: allergy.allergyName,
            })
          );
        });
      });
    }
  }

  deleteIngredient(ingredient: any, index: number) {
    if (this.editMode) {
      this.recipeService
        .deleteIngredient(
          ingredient.recipe_ingredient_id!,
          this.recipe!.recipe_id!
        )
        .subscribe(() => {
          this.recipeIngredientsFormArray.removeAt(index);
        });
    } else {
      this.recipeIngredientsFormArray.removeAt(index);
    }
  }

  sanitizeImage(base64: string): SafeUrl | undefined {
    if (base64 != null) {
      return this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64}`
      );
    } else return undefined;
  }

  addToArray() {
    let newRecipeIngredient = this.fb.group({
      recipe_ingredient_id: null,
      recipe_ingredient_name: this.recipeIngredientFormGroup.get(
        'recipe_ingredient_name'
      )?.value,
      recipe_ingredient_amount: this.recipeIngredientFormGroup.get(
        'recipe_ingredient_amount'
      )?.value,
      recipe_ingredient_measurement: this.recipeIngredientFormGroup.get(
        'recipe_ingredient_measurement'
      )?.value,
    });

    this.recipeIngredientsFormArray.push(newRecipeIngredient);
    this.recipeIngredientFormGroup.reset();
  }

  addAllergy(allergyString: string) {
    let newAllergy = new FormControl(allergyString);
    if (allergyString) {
      this.allergyFormArray.push(
        this.fb.group({ allergyId: null, allergyName: newAllergy })
      );
      this.allergyFormControl.reset();
    }
  }

  removeAllergy(allergyIndex: number) {
    this.allergyFormArray.removeAt(allergyIndex);
  }

  moveItemInFormArray(
    formArray: FormArray,
    fromIndex: number,
    toIndex: number
  ): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }

  drop(event: any) {
    this.moveItemInFormArray(
      this.methodFormArray,
      event.previousIndex,
      event.currentIndex
    );

    for (let index = 0; index < this.methodFormArray.controls.length; index++) {
      this.methodFormArray.controls[index]
        .get('method_step')
        ?.setValue(index + 1);
    }
  }

  addMethod() {
    this.methodFormArray.push(
      this.fb.group({
        methodId: null,
        method_step: this.methodSteps,
        method_description: '',
      })
    );
    this.methodSteps++;
  }

  onFileUpload(event: any) {
    this.recipeImage = event.target.files[0];

    const fileInput = event.target as HTMLInputElement;
    let base64Image;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        base64Image = reader.result as string;
        if (this.recipe) {
          this.recipe.imageSafeUrl = base64Image;
          this.recipe.imageBase64 = base64Image;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  saveRecipe() {
    if (!this.recipeImage) {
      if (
        this.recipe?.imageSafeUrl != undefined ||
        this.recipe?.imageBase64 != undefined
      ) {
        const newRecipe: Recipe = this.recipeCreationForm.value;
        this.recipeService
          .createRecipe(newRecipe, this.recipeImage)
          .subscribe(() => {
            this.router.navigate(['my-recipes']);
          });
      } else {
        const placeholderImagePath = 'assets/images/placeholder.jpg';
        fetch(placeholderImagePath)
          .then((response) => response.blob())
          .then((blob) => {
            this.recipeImage = new File([blob], 'placeholder.jpg', {
              type: 'image/jpeg',
            });
            const newRecipe: Recipe = this.recipeCreationForm.value;
            this.recipeService
              .createRecipe(newRecipe, this.recipeImage)
              .subscribe(() => {
                this.router.navigate(['my-recipes']);
              });
          })
          .catch((error) => {
            console.error('Error loading placeholder image:', error);
          });
      }
    } else {
      const newRecipe: Recipe = this.recipeCreationForm.value;
      this.recipeService
        .createRecipe(newRecipe, this.recipeImage)
        .subscribe(() => {
          this.router.navigate(['my-recipes']);
        });
    }
  }
}
