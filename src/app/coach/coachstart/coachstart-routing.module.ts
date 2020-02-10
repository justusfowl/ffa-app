import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachstartPage } from './coachstart.page';

const routes: Routes = [
  {
    path: '',
    component: CoachstartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachstartPageRoutingModule {}
