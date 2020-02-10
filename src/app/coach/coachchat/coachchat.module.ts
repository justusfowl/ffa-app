import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoachchatPageRoutingModule } from './coachchat-routing.module';

import { CoachchatPage } from './coachchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachchatPageRoutingModule,
    TranslateModule.forChild(), 
  ],
  declarations: [CoachchatPage]
})
export class CoachchatPageModule {}
