import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimesPageRoutingModule } from './times-routing.module';

import { TimesPage } from './times.page';
import { TranslateModule } from '@ngx-translate/core';

import { AnnouncementModule } from '../_components/announcement/announcement.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimesPageRoutingModule, 
    TranslateModule.forChild(), 
    AnnouncementModule
  ],
  declarations: [TimesPage]
})
export class TimesPageModule {}
