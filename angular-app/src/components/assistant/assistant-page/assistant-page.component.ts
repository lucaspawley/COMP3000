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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';

class Message {
  sender!: string;
  type!: string;
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
    DialogModule
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
  messageLoading: boolean = false;

  format: any;

  promptFormGroup!: FormGroup;

  imageSafeUrl!: SafeUrl | null;
  image64Base!: string;

  userSafeUrl!: SafeUrl | null;
  userImage64Base!: string;

  dialogVisible: boolean = false;

  constructor(
    private geminiService: GeminiService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private recipeService: RecipeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.promptFormGroup = this.fb.group({ prompt: '', response: '' });

    this.messages.push({
      sender: 'bot',
      type: 'text',
      message: `Hi ${this.accountService.currentAccount?.username}, I'm your AI sous chef! What kind of recipe would you like?`,
    });
    console.log(this.messages);

    this.accountService.currentAccount?.tasteProfile?.allergies?.forEach(
      (allergy) => this.userAllergies.push(allergy.allergyName!)
    );

    this.accountService.currentAccount?.tasteProfile?.dietPreferences?.forEach(
      (dietPref) => this.userAllergies.push(dietPref.dietPreferenceName!)
    );

    this.accountService.currentAccount?.tasteProfile?.ingredients?.forEach(
      (ingredient) => this.userAllergies.push(ingredient.ingredientName!)
    );

    this.prompt = `You are an expert chef that wants to get people more into cooking by suggesting recipes that people can cook at home, you can change previous recipes you suggested, you will give the recipe in the format of:
                    recipe name, cook time, preparation time, amount of people it serves, then a list of Ingredients that are in the measurements of grams, kilograms or milliliters except for items such as onions
                    then the method for the recipe, the user asking for the recipe is allergic to ${
                      this.userAllergies
                    }, who has dietary preference of ${
      this.userAllergies
    } and does not like ${this.userDislikes}.
                    Users may mention ingredients they would like to be included, make sure to find an appropriate recipe.
                    Do not mention the users allergies, dietary preference, or disliked ingredients.
                    Do not use markdown for the recipe name, use **.
                    Make sure method is on a different line than the ingredients and that each method is split into text
                    If a recipe contains Milk, Eggs, Peanuts, Tree nuts (almonds, walnuts, cashews, etc.), Soy, Wheat, Fish, Shellfish, Sesame add it to the allergies in the JSON
                    Method steps must fit in a VARCHAR(255).
                    Do not mention the JSON response
                    Also, create a JSON response using this JSON schema:
                    Recipe = {
                    "recipe_id": null; // to be filled later
                    "recipe_name": string;
                    "recipe_rating": 0
                    "recipe_serves": number;
                    "recipe_prep_time": number; // in minutes
                    "recipe_cook_time": number; // in minutes
                    "accountId": ${
                      this.accountService.currentAccount?.accountId
                    }
                    "allergies": [
                      {
                        "allergyId": null; // to be filled later
                        "allergyName": string;
                      }
                    ];
                    "ingredients": [
                     {
                        "recipe_ingredient_id": null; // to be filled later
                        "recipe_ingredient_amount": number;
                        "recipe_ingredient_measurement": string; //cannot be null if empty make " "
                        "recipe_ingredient_name": string;
                      }
                    ];
                    "methods": [
                      {
                        methodId: null; // to be filled later
                        method_step: number;
                        method_description: string;
                      }
                    ];
                  }

                  Do not add line breaks to the JSON.
                  Only recipe_id, allergyId, recipe_ingredient_id and methodId can be null, everything else must have data

                  This is what the user has asked for "${
                    this.promptFormGroup.get('prompt')!.value
                  }"
                  These are the previous messages sent between you and the user ${
                    this.history
                  }`;
  }

  async sendMessage() {
    this.messageLoading = true;

    this.messages.push({
      sender: 'user',
      type: 'text',
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

        if (!this.imageSafeUrl) {
          const placeholderImagePath = 'assets/images/placeholder.jpg';
          let recipeImage;

          fetch(placeholderImagePath)
            .then((response) => response.blob())
            .then((blob) => {
              recipeImage = new File([blob], 'placeholder.jpg', {
                type: 'image/jpeg',
              });

              this.recipeService
                .createRecipe(newRecipe, recipeImage)
                .subscribe((res) => {
                  this.messages.push({
                    sender: 'bot',
                    type: 'text',
                    message: `I've added ${res.recipe_name} to your recipes`,
                  });
                  this.messageLoading = false;
                });
            })
            .catch((error) => {
              console.error('Error loading placeholder image:', error);
            });
        } else {
          if (newRecipe.recipe_name)
            this.recipeService
              .createRecipe(
                newRecipe,
                this.base64ToFile(
                  this.image64Base,
                  newRecipe.recipe_name,
                  'image/png'
                )
              )
              .subscribe((res) => {
                this.messages.push({
                  sender: 'bot',
                  type: 'text',
                  message: `I've added ${res.recipe_name} to your recipes`,
                });
                this.messageLoading = false;
              });
        }
      }
    } else if (message.includes('image')) {
      this.promptFormGroup.get('prompt')?.reset();

      let newRecipe: Recipe = this.recipeJSON as unknown as Recipe;
      if (newRecipe.recipe_name)
        await this.geminiService.generateImage(newRecipe.recipe_name);
      if (this.geminiService.image) {
        this.image64Base = this.geminiService.image;
        this.imageSafeUrl = this.sanitizeImage(this.geminiService.image);
        this.messages.push({
          sender: 'bot',
          type: 'text',
          message: `Here is an image I've generated for the ${newRecipe.recipe_name}.`,
        });
        this.messages.push({
          sender: 'bot',
          type: 'image',
          message: 'image',
        });
      }
      this.messageLoading = false;
    } else {
      this.promptFormGroup.get('prompt')?.reset();

      const result = await this.geminiService
        .initializeModel()
        .generateContent(this.prompt);

      let formatResponse =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text;

      formatResponse = formatResponse?.replace(/\n/g, '<br>');
      formatResponse = formatResponse?.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );

      const responseArray = formatResponse?.split('json<br>');

      if (responseArray && responseArray.length > 1) {
        let text = responseArray[0];
        text = text.replace(/```/g, '').replace('<br><br><br>', '').trim();
        this.format = text;

        let jsonText = responseArray[1];

        jsonText = jsonText.replace(/<br>/g, '');
        jsonText = jsonText.replace(/```/g, '');
        jsonText = jsonText.trim();

        try {
          this.recipeJSON = JSON.parse(jsonText);
        } catch (error) {
          console.error('JSON Parsing Error:', error);
          console.log('Problematic JSON:', jsonText);
          this.recipeJSON = undefined;
        }
      } else {
        this.format = formatResponse;
      }

      this.messageLoading = false;
      this.messages.push({ sender: 'bot', type: 'text', message: this.format });
      this.history.push('you said: ' + result.response.text());

      this.promptFormGroup.get('response')?.setValue(result.response.text());
    }
  }

  async sendImage() {
    this.messages.push({
      sender: 'user',
      type: 'image',
      message: 'image',
    });
    this.messageLoading = true;
    await this.geminiService
      .sendImage(this.userImage64Base, this.prompt)
      .then((result) => {
        let formatResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        formatResponse = formatResponse?.replace(/\n/g, '<br>');
        formatResponse = formatResponse?.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>'
        );

        const responseArray = formatResponse?.split('json<br>');

        if (responseArray && responseArray.length > 1) {
          let text = responseArray[0];
          text = text.replace(/```/g, '').replace('<br><br><br>', '').trim();
          this.format = text;

          let jsonText = responseArray[1];

          jsonText = jsonText.replace(/<br>/g, '');
          jsonText = jsonText.replace(/```/g, '');
          jsonText = jsonText.trim();

          try {
            this.recipeJSON = JSON.parse(jsonText);
          } catch (error) {
            console.error('JSON Parsing Error:', error);
            console.log('Problematic JSON:', jsonText);
            this.recipeJSON = undefined;
          }
        } else {
          this.format = formatResponse;
        }

        this.messageLoading = false;
        this.messages.push({
          sender: 'bot',
          type: 'text',
          message: this.format,
        });
        this.history.push(
          'you said: ' + result?.candidates?.[0]?.content?.parts?.[0]?.text
        );
      });
  }

  onFileUpload(event: any) {
    const fileInput = event.target as HTMLInputElement;
    let base64Image;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        base64Image = reader.result as string;

        this.userImage64Base = base64Image;
        this.userSafeUrl = this.sanitizeImage(base64Image);
      };

      reader.readAsDataURL(file);
    }
  }

  showDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  base64ToFile(
    base64: string,
    fileName: string,
    mimeType: string
  ): File | undefined {
    if (!base64 || typeof base64 !== 'string') {
      console.error('Invalid Base64 input:', base64);
      return undefined;
    }

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], fileName, { type: mimeType });
  }

  sanitizeImage(base64: string): SafeUrl | null {
    if (base64 != null) {
      return this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64}`
      );
    } else return null;
  }
}
