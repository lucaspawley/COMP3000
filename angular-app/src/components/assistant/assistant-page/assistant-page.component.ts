import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../../../services/gemini.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AccountService } from '../../../services/account.service';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../types/types';

class Message {
  sender!: string;
  message!: string;
}

@Component({
  selector: 'app-assistant-page',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
  ],
  templateUrl: './assistant-page.component.html',
  styleUrl: './assistant-page.component.scss',
})
export class AssistantPageComponent implements OnInit {
  prompt: string = '';
  response: string = '';
  messages: Array<Message> = [];
  history: Array<string> = [];

  userAllergies: Array<string> = [];
  userDietPref: Array<string> = [];
  userDislikes: Array<string> = [];

  recipeJSON: JSON | undefined;

  format: any;

  promptFormGroup!: FormGroup;

  constructor(
    private geminiService: GeminiService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.promptFormGroup = this.fb.group({ prompt: '', response: '' });

    this.messages.push({
      sender: 'bot',
      message: `Hi ${this.accountService.currentAccount?.username}, I'm your AI sous chef! What kind of recipe would you like?`,
    });

    this.accountService.currentAccount?.tasteProfile?.allergies?.forEach(
      (allergy) => this.userAllergies.push(allergy.allergyName!)
    );

    this.accountService.currentAccount?.tasteProfile?.dietPreferences?.forEach(
      (dietPref) => this.userAllergies.push(dietPref.dietPreferenceName!)
    );

    this.accountService.currentAccount?.tasteProfile?.ingredients?.forEach(
      (ingredient) => this.userAllergies.push(ingredient.ingredientName!)
    );
  }

  async sendMessage() {
    this.messages.push({
      sender: 'user',
      message: this.promptFormGroup.get('prompt')!.value,
    });

    this.history.push(
      'user said: ' + this.promptFormGroup.get('prompt')!.value
    );

    const message: string = this.promptFormGroup.get('prompt')!.value;

    if (message.includes('add')) {
      this.promptFormGroup.get('prompt')?.reset();

      if (this.recipeJSON) {
        let newRecipe: Recipe = this.recipeJSON as unknown as Recipe;
        newRecipe.accountId = this.accountService.currentAccount?.accountId;
        console.log(newRecipe);
        this.recipeService
          .createRecipe(newRecipe, undefined)
          .subscribe((res) => {
            this.messages.push({
              sender: 'bot',
              message: `I've added ${res.recipe_name} to your recipes`,
            });
          });
      }
    } else {
      this.promptFormGroup.get('prompt')?.reset();

      this.prompt = `You are an expert chef that wants to get people more into cooking by suggesting recipes that people can cook at home, you can change previous recipes you suggested, you will give the recipe in the format of:
      recipe name, cook time, preparation time, amount of people it serves, then a list of Ingredients that are in the measurements of grams, kilograms or milliliters execpt for items such as onions
       then the method for the recipe, the user asking for the recipe is allergic to ${
         this.userAllergies
       }, who has dietray perference of ${
        this.userAllergies
      } and does not like ${this.userDislikes}.
      Do not mention the users allergies, dietary preference or disliked ingredients.
      Do not use markdown for the recipe name, use **
      Also create a JSON response for the recipe with this schema
      make sure that the recipe_ingredient_amount and recipe_ingredient_measurement is not null
      
      recipe_id: null;
      recipe_name: string;
      recipe_rating: 0;
      recipe_serves: number;
      recipe_prep_time: number;
      recipe_cook_time: number;
      allergies?: [{ allergyId: null; allergyNam?: string }];
      ingredients?: [{
        recipe_ingredient_id: null;
        recipe_ingredient_amount: number;
        recipe_ingredient_measurement: string;
        recipe_ingredient_name: string;
      }];
      methods?: [{
        methodId: null;
        method_step: number;
        method_description: string;
      }];

      do not add line breaks to the json

      This is what the user has asked for "${
        this.promptFormGroup.get('prompt')!.value
      }"
      These are the previous messages sent between you and the user ${
        this.history
      }`;

      const result = await this.geminiService
        .initializeModel()
        .generateContent(this.prompt);
      const response = result.response.text();

      let formatResponse =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(formatResponse);
      formatResponse = formatResponse?.replace(/\n/g, '<br>');
      formatResponse = formatResponse?.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      const responseArray = formatResponse?.split('json<br>');
      if (responseArray) {
        let text = responseArray[0];

        text = text.replace('```', '');
        text = text.replace('<br><br><br>', '');
        text = text.trim();

        this.format = text;
        console.log(responseArray[1]);
        this.recipeJSON = JSON.parse(
          responseArray[1].replace('<br>```<br>', '')
        );
      } else {
        this.format = formatResponse;
      }

      this.messages.push({ sender: 'bot', message: this.format });
      this.history.push('you said: ' + result.response.text());

      this.promptFormGroup.get('response')?.setValue(response);
    }
  }
}
