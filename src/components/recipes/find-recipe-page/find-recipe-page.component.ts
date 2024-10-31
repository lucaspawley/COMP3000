import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-find-recipe-page',
  standalone: true,
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ImageModule,
    ButtonModule,
  ],
  templateUrl: './find-recipe-page.component.html',
  styleUrl: './find-recipe-page.component.scss',
})
export class FindRecipePageComponent {
  recipe1: Recipe = {
    recipeName: 'Spahetti Bolognese',
    recipeImage: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-bolognese-65a0ab3.jpg',
    recipeAllergy: ['Gluten'],
    recipeIngredients: [
      {
        ingredientName: 'Beef Mince',
        ingredientAmount: 300,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Pork Mince',
        ingredientAmount: 200,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Large Shallots',
        ingredientAmount: 2,
      },
      {
        ingredientName: 'Garlic Cloves',
        ingredientAmount: 3,
      },
      {
        ingredientName: 'Passata',
        ingredientAmount: 500,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Tomato Puree',
        ingredientAmount: 1,
        ingredientMeasurement: 'tbsp',
      },
      {
        ingredientName: 'Red Wine',
        ingredientAmount: 100,
        ingredientMeasurement: 'ml',
      },
      {
        ingredientName: 'Spaghetti',
        ingredientAmount: 400,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Parmeasan',
        ingredientAmount: 50,
        ingredientMeasurement: 'g',
      },
    ],
    recipeMethod: [
      'Put 1 tbsp of the oil in a large saucepan over a medium-high heat, add the beef and fry until well browned. Tip out into a dish and repeat with 1 tbsp oil and the pork. Tip the pork into the dish with the beef and put the pan back on the heat with the remaining oil. Turn the heat down and cook the shallots for 8-10 mins or until very soft, then add the garlic. Tip the meat back into the pan and add the passata, purée, wine and oregano. Stir everything together, cover and simmer over a low heat, stirring occasionally, for 45 mins.',
      'Cook the spaghetti following pack instructions, then stir half the parmesan into the Bolognese. Put a spoonful of the pasta water into the sauce to loosen it if it looks too thick, then drain the spaghetti. For a better flavour, tip the pasta onto the sauce, toss everything together to coat, and season well (or serve with the sauce on top). Add the remaining parmesan and a few basil leaves.',
    ],
    recipeRating: 0,
    recipeServes: "Serves 4",
  };

  recipe2: Recipe = {
    recipeName: 'Sweet potato & peanut curry',
    recipeImage: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/satay-sweet-potato-curry-17cc62d.jpg?quality=90&webp=true&resize=300,272',
    recipeAllergy: ['Gluten'],
    recipeIngredients: [
      {
        ingredientName: 'Beef Mince',
        ingredientAmount: 300,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Pork Mince',
        ingredientAmount: 200,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Large Shallots',
        ingredientAmount: 2,
      },
      {
        ingredientName: 'Garlic Cloves',
        ingredientAmount: 3,
      },
      {
        ingredientName: 'Passata',
        ingredientAmount: 500,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Tomato Puree',
        ingredientAmount: 1,
        ingredientMeasurement: 'tbsp',
      },
      {
        ingredientName: 'Red Wine',
        ingredientAmount: 100,
        ingredientMeasurement: 'ml',
      },
      {
        ingredientName: 'Spaghetti',
        ingredientAmount: 400,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Parmeasan',
        ingredientAmount: 50,
        ingredientMeasurement: 'g',
      },
    ],
    recipeMethod: [
      'Put 1 tbsp of the oil in a large saucepan over a medium-high heat, add the beef and fry until well browned. Tip out into a dish and repeat with 1 tbsp oil and the pork. Tip the pork into the dish with the beef and put the pan back on the heat with the remaining oil. Turn the heat down and cook the shallots for 8-10 mins or until very soft, then add the garlic. Tip the meat back into the pan and add the passata, purée, wine and oregano. Stir everything together, cover and simmer over a low heat, stirring occasionally, for 45 mins.',
      'Cook the spaghetti following pack instructions, then stir half the parmesan into the Bolognese. Put a spoonful of the pasta water into the sauce to loosen it if it looks too thick, then drain the spaghetti. For a better flavour, tip the pasta onto the sauce, toss everything together to coat, and season well (or serve with the sauce on top). Add the remaining parmesan and a few basil leaves.',
    ],
    recipeRating: 0,
    recipeServes: "Serves 4",
  };

  recipes: Array<Recipe> = [this.recipe1, this.recipe2];
}
