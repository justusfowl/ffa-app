import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'times',
    loadChildren: () => import('./times/times.module').then( m => m.TimesPageModule)
  },
  {
    path: 'prescription',
    loadChildren: () => import('./prescription/prescription.module').then( m => m.PrescriptionPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'coach',
    loadChildren: () => import('./coach/coachstart/coachstart.module').then( m => m.CoachstartPageModule)
  },
  {
    path: 'coachchat',
    loadChildren: () => import('./coach/coachchat/coachchat.module').then( m => m.CoachchatPageModule)
  },
  {
    path: 'eval',
    loadChildren: () => import('./coach/eval/eval.module').then( m => m.EvalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
