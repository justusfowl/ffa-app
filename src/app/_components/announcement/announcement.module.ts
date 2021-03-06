import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { AnnouncementComponent } from './announcement.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule.forChild(), 
  ],
  exports : [AnnouncementComponent],
  declarations: [AnnouncementComponent]
})
export class AnnouncementModule {}
