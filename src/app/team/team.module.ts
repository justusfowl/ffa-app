import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-routing.module';

import { TeamPage } from './team.page';
import { TranslateModule } from '@ngx-translate/core';

import { PipesModule } from '../services/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule, 
    TranslateModule.forChild(), 
    PipesModule
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
