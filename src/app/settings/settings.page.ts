import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  langs = [
    
    {
      "key" : "de", 
      "display" : "Deutsch"
    },
    {
      "key" : "en", 
      "display" : "English"
    }
  ]

  constructor(
    private modalCtrl:ModalController, 
    public translateCfgSrv : TranslateConfigService
    ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  handleLanguageChange(evt){
    this.translateCfgSrv.setLanguage(evt);
  }
}
