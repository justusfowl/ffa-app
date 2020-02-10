import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsPage } from './settings/settings.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'myFFA',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Termine',
      url: '/appointments',
      icon: 'list'
    },
    {
      title: 'Öffnungszeiten',
      url: '/times',
      icon: 'list'
    },
    {
      title: 'Rezepte',
      url: '/prescription',
      icon: 'list'
    },
    {
      title: 'Team',
      url: '/team',
      icon: 'list'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    public modalController : ModalController
  ) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  async openSettings(ev: any) {
    const modal = await this.modalController.create({
      component: SettingsPage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

}
