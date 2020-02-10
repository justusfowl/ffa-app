import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoachstartPageRoutingModule } from './coachstart-routing.module';

import { CoachstartPage } from './coachstart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachstartPageRoutingModule,
    TranslateModule.forChild(), 
  ],
  declarations: [CoachstartPage]
})
export class CoachstartPageModule {}
