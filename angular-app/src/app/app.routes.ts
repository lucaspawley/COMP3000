import { Routes } from '@angular/router';
import { UserLoginComponent } from '../components/account/user-login/user-login.component';
import { AccountPageComponent } from '../components/account/account-page/account-page.component';
import { FindRecipePageComponent } from '../components/recipes/find-recipe-page/find-recipe-page.component';
import { AssistantPageComponent } from '../components/assistant/assistant-page/assistant-page.component';
import { ShoppingListsPageComponent } from '../components/shopping-lists-page/shopping-lists-page.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { RecipeComponent } from '../components/recipes/recipe/recipe.component';
import { MyRecipesComponent } from '../components/recipes/my-recipes/my-recipes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'find-recipes', component: FindRecipePageComponent },
  { path: 'assistant', component: AssistantPageComponent },
  { path: 'shopping-lists', component: ShoppingListsPageComponent },
  { path: ':recipeName', component: RecipeComponent, pathMatch: 'full' },
];
