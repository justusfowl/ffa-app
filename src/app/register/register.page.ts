import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../services/translate-config.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user : any;

  constructor(
    private dataSrv: DataService, 
    private auth : AuthService, 
    private router : Router, 
    private translateCfg : TranslateConfigService, 
    private toastController : ToastController

  ) {
    this.user = {
      "userName" : "", 
      "password" : ""
    }

   }

  ngOnInit() {

  }

  async presentSuccess(){
    const toast = await this.toastController.create({
      header: this.translateCfg.translate.instant("WELCOME"),
      message:  this.translateCfg.translate.instant("REGISTER_USER_SUCCESS_WELCOME"),
      position: 'top',
      buttons: [
        {
          side: 'start',
          text: 'OK',
          handler: () => {
            this.goToHome();
          }
        }
      ]
    });
    toast.present();
  }

  goToHome(){
    let self = this;
    setTimeout(function(){
      self.router.navigate(["/home"], { replaceUrl: true });
      self.dataSrv.initService();
      self.dataSrv.setLoading(false);
    },500)
  }

  register() {

    let self = this;

    if (!this.user.userName || !this.user.password) {
          return;
      }

      this.dataSrv.setLoading(true);
      

      this.auth.register(this.user.userName, this.user.password)
          .subscribe(
              userData => {
                this.presentSuccess();
              },
              error => {
                
                this.dataSrv.setLoading(false);

                if (error.err.status == 409){
                  this.dataSrv.showError(this.translateCfg.translate.instant("REGISTER_USER_EXISTS"));
                }else if (error.err.status == 406) {
                  this.dataSrv.showError(this.translateCfg.translate.instant("REGISTER_STRONG_USER_PASSWORD"));
                }else{
                  this.dataSrv.showError(this.translateCfg.translate.instant("LOGIN_ERROR"));
                }
                 console.error(error);
              });
  }

}
