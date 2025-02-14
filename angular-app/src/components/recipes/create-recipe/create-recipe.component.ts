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
import { Recipe } from '../../types/types';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { FileUploadModule } from 'primeng/fileupload';

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

  allergyFormArray!: FormArray;
  allergyFormControl!: FormControl;

  recipeIngredientsFormArray!: FormArray;
  recipeIngredientFormGroup!: FormGroup;

  methodFormArray!: FormArray;
  methodFormGroup!: FormGroup;

  methodSteps: number = 2;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
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
  }

  saveRecipe() {
    const newRecipe: Recipe = this.recipeCreationForm.value;

    this.recipeService
      .createRecipe(newRecipe, this.recipeImage)
      .subscribe(() => {
        this.router.navigate(['my-recipes']);
      });
  }
}
