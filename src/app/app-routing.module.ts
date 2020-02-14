import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authguard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'times',
    loadChildren: () => import('./times/times.module').then( m => m.TimesPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'prescription',
    loadChildren: () => import('./prescription/prescription.module').then( m => m.PrescriptionPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then( m => m.AppointmentsPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'coach',
    loadChildren: () => import('./coach/coachstart/coachstart.module').then( m => m.CoachstartPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'coachchat',
    loadChildren: () => import('./coach/coachchat/coachchat.module').then( m => m.CoachchatPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'coach/eval',
    loadChildren: () => import('./coach/eval/eval.module').then( m => m.EvalPageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
