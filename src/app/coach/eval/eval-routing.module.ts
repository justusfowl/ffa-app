import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvalPage } from './eval.page';

const routes: Routes = [
  {
    path: '',
    component: EvalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvalPageRoutingModule {}
