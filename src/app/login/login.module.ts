import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPage } from './login.page';

import { PipesModule } from '../services/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule, 
    TranslateModule.forRoot(),
    PipesModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
