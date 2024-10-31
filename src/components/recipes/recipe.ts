import { Ingredient } from './ingredient';

export type Recipe = {
  recipeName: string;
  recipeImage?: any;
  recipeAllergy?: Array<string> | undefined;
  recipeDietPreferance?: Array<string> | undefined;
  recipeIngredients: Array<Ingredient>;
  recipeMethod: Array<string>;
  recipeRating: number;
  recipeServes: string;
};
