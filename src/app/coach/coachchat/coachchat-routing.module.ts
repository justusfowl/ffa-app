import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachchatPage } from './coachchat.page';

const routes: Routes = [
  {
    path: '',
    component: CoachchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachchatPageRoutingModule {}
