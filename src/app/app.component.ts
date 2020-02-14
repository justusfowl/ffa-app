import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsPage } from './settings/settings.page';

import { ProfilePage } from './profile/profile.page';
import { TranslateConfigService } from './services/translate-config.service';
import { DataService } from './services/dataservice';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  currentUserName : string = ""; 

  public appPages = [
    {
      title: 'myFFA',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'APPOINTMENTS',
      url: '/appointments',
      icon: 'list'
    },
    {
      title: 'OPENINGHOURS',
      url: '/times',
      icon: 'list'
    },
    {
      title: 'PRESCRIPTIONS',
      url: '/prescription',
      icon: 'list'
    },
    {
      title: 'TEAM',
      url: '/team',
      icon: 'list'
    },
    {
      title: 'Coach',
      beta : true,
      url: '/coach',
      icon: 'list'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    public modalController : ModalController,
    public translateCfgService : TranslateConfigService, 
    private dataSrv : DataService, 
    public auth : AuthService, 
    private router: Router
  ) {

    this.initializeApp();
    let defaultLang = this.translateCfgService.getDefaultLanguage();
    this.translateCfgService.setLanguage(defaultLang)
    
    this.dataSrv.initService();

    if (this.auth.isAuthorized()){
      this.router.navigate(["/home"], { replaceUrl: true });
    }

    this.auth.currentUser.subscribe((x : any) => {

      if(x){
        this.currentUserName = x.userName
      }else{
        this.currentUserName = "";
      }
      
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openSettings(ev: any) {
    const modal = await this.modalController.create({
      component: SettingsPage
    });
    return await modal.present();
  }

  async openProfile(ev: any) {
    const modal = await this.modalController.create({
      component: ProfilePage
    });
    return await modal.present();
  }

}
