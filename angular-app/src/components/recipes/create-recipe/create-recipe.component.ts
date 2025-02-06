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
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  recipeCreationForm!: FormGroup;

  allergyFormArray!: FormArray;
  allergyFormControl!: FormControl;

  recipeIngredientsFormArray!: FormArray;
  recipeIngredientFormGroup!: FormGroup;

  methodFormArray!: FormArray;
  methodFormGroup!: FormGroup;

  methodSteps: Number = 2;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}

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
      allergies: this.allergyFormArray,
      ingredients: this.recipeIngredientsFormArray,
      methods: this.methodFormArray,
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
  }

  saveRecipe() {
    console.log(this.methodFormArray);
    console.log(this.recipeCreationForm);
  }
}
