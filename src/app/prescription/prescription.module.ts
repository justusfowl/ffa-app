import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescriptionPageRoutingModule } from './prescription-routing.module';

import { PrescriptionPage } from './prescription.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescriptionPageRoutingModule, 
    TranslateModule.forChild()
  ],
  declarations: [PrescriptionPage]
})
export class PrescriptionPageModule {}
