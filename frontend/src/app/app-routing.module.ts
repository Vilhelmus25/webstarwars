import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterSelectionComponent } from './pages/character-selection/character-selection.component';
import { LoginComponent } from './pages/login/login.component';
import { SimulateFightComponent } from './pages/simulate-fight/simulate-fight.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'characterSelection',
    component: CharacterSelectionComponent,
  },
  {
    path: 'simulateFight',
    component: SimulateFightComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
