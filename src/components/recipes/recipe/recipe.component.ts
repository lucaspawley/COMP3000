import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CardModule, ImageModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  recipe: Recipe = {
    recipeName: 'Spahetti Bolognese',
    recipeImage:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-bolognese-65a0ab3.jpg',
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
    recipeServes: 'Serves 4',
    favourite: false,
  };

  recipe2: Recipe = {
    recipeName: 'Sweet potato & peanut curry',
    recipeImage:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/satay-sweet-potato-curry-17cc62d.jpg?quality=90&webp=true&resize=300,272',
    recipeAllergy: ['Gluten', 'Ginger', 'Nuts'],
    recipeIngredients: [
      {
        ingredientName: 'Coconut oil',
        ingredientAmount: 1,
        ingredientMeasurement: 'tbsp',
      },
      {
        ingredientName: 'Onion',
        ingredientAmount: 1,
      },
      {
        ingredientName: 'Garlic Cloves',
        ingredientAmount: 3,
      },
      {
        ingredientName: 'Ginger',
        ingredientAmount: 1,
      },
      {
        ingredientName: 'Thai Red Curry Paste',
        ingredientAmount: 3,
        ingredientMeasurement: 'tbsp',
      },
      {
        ingredientName: 'Smooth Peanut Butter',
        ingredientAmount: 1,
        ingredientMeasurement: 'tbsp',
      },
      {
        ingredientName: 'Sweet Potato',
        ingredientAmount: 500,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Coconut Milk',
        ingredientAmount: 400,
        ingredientMeasurement: 'ml',
      },
      {
        ingredientName: 'Spinach',
        ingredientAmount: 200,
        ingredientMeasurement: 'g',
      },
      {
        ingredientName: 'Lime',
        ingredientAmount: 1,
      },
      {
        ingredientName: 'Cooked Rice',
        ingredientAmount: 500,
        ingredientMeasurement: 'g',
      },
    ],
    recipeMethod: [
      'Melt 1 tbsp coconut oil in a saucepan over a medium heat and soften 1 chopped onion for 5 mins. Add 2 grated garlic cloves and a grated thumb-sized piece of ginger, and cook for 1 min until fragrant.',
      'Stir in 3 tbsp Thai red curry paste, 1 tbsp smooth peanut butter and 500g sweet potato, peeled and cut into chunks, then add 400ml coconut milk and 200ml water.',
      'Bring to the boil, turn down the heat and simmer, uncovered, for 25-30 mins or until the sweet potato is soft.',
      'Stir through 200g spinach and the juice of 1 lime, and season well. Serve with cooked rice, and if you want some crunch, sprinkle over a few dry roasted peanuts.',
    ],
    recipeRating: 0,
    recipeServes: 'Serves 4',
    favourite: false,
  };

  selectedRecipe: Recipe | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.forEach((url: any) => {
      if (url[0].path == this.recipe.recipeName) {
        this.selectedRecipe = this.recipe;
      } else {
        this.selectedRecipe = this.recipe2;
      }
    });
  }
}
