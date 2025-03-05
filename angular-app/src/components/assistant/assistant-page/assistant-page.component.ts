import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../../../services/gemini.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

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

  format: any;

  promptFormGroup!: FormGroup;

  constructor(private geminiService: GeminiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.promptFormGroup = this.fb.group({ prompt: '', response: '' });
  }

  async textOnlyDemo() {
    this.messages.push({
      sender: 'user',
      message: this.promptFormGroup.get('prompt')!.value,
    });

    this.history.push(
      'user said: ' + this.promptFormGroup.get('prompt')!.value
    );

    this.prompt = `You are an expert chef that wants to get people more into cooking by suggesting recipes that people can cook at home, you can change previous recipes you suggested, you will give the recipe in the format of:
      recipe name, cook time, preparation time, amount of people it serves, then a list of Ingredients that are in the measurements of grams, kilograms or milliliters execpt for items such as onions
       then the method for the recipe, the user asking for the recipe is allergic to cumin, is a vegan and does not like tofu.
      Do not mention the users allergies, dietary preference or disliked ingredients.

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

    let test = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
    test = test?.replace(/\n/g, '<br>');
    this.format = test?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    this.messages.push({ sender: 'bot', message: this.format });
    this.history.push('you said: ' + result.response.text());

    this.promptFormGroup.get('prompt')?.reset();

    this.promptFormGroup.get('response')?.setValue(response);
  }
}
