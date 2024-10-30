import { Routes } from '@angular/router';
import { UserLoginComponent } from '../components/account/user-login/user-login.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { AccountPageComponent } from '../components/account/account-page/account-page.component';
import { FavRecipePageComponent } from '../components/recipes/fav-recipe-page/fav-recipe-page.component';
import { FindRecipePageComponent } from '../components/recipes/find-recipe-page/find-recipe-page.component';
import { AssistantPageComponent } from '../components/assistant/assistant-page/assistant-page.component';
import { ShoppingListsPageComponent } from '../components/shopping-lists-page/shopping-lists-page.component';

export const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
    children: [
      { path: 'account', component: AccountPageComponent },
      { path: 'favourite-recipes', component: FavRecipePageComponent },
      { path: 'find-recipes', component: FindRecipePageComponent },
      { path: 'assistant', component: AssistantPageComponent },
      { path: 'shopping-lists', component: ShoppingListsPageComponent },
    ],
  },
];
