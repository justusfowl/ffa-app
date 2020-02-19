import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../services/pipes.module';
import { AnnouncementModule } from '../_components/announcement/announcement.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]), 
    TranslateModule.forChild(), 
    PipesModule, 
    AnnouncementModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}