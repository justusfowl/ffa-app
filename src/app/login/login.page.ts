import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/dataservice';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  // workaround due to slow translate loader
  translatedVals : any = {
    "WELCOME" :"Willkommen",
    "EMAIL_PLACEHOLDER" : "ihre@email.de", 
    "PASSWORD" :"Passwort", 
    "REGISTER_BTN" : "Registrieren",
    "OR" : "oder"
  };

  public user: any;

  constructor(
    public router: Router, 
    public formBuilder: FormBuilder, 
    private auth: AuthService, 
    private translateCfg : TranslateConfigService,
    private dataSrv : DataService) {

      this.user = {
        "userName" : "", 
        "password" : ""
      }

    
     }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.translatedVals = {
      "WELCOME" : this.translateCfg.translate.instant("WELCOME"),
      "EMAIL_PLACEHOLDER" : this.translateCfg.translate.instant("EMAIL_PLACEHOLDER"), 
      "PASSWORD" : this.translateCfg.translate.instant("PASSWORD"), 
      "REGISTER_BTN" : this.translateCfg.translate.instant("REGISTER_BTN"), 
      "OR" : this.translateCfg.translate.instant("OR")
    }

  }

  login() {

    let self = this;

    if (!this.user.userName || !this.user.password) {
          return;
      }

      this.dataSrv.setLoading(true);
      

      this.auth.login(this.user.userName, this.user.password)
          .subscribe(
              userData => {
                  this.router.navigate(["/home"], { replaceUrl: true });
                  setTimeout(function(){
                    self.dataSrv.initService();
                    self.dataSrv.setLoading(false);
                  },500)
              },
              error => {
                
                self.dataSrv.showError(this.translateCfg.translate.instant("LOGIN_ERROR"));
                
                setTimeout(function(){
                  self.dataSrv.setLoading(false);
                },500)

                console.error(error);
              });
  }

  register(){
    this.router.navigate(["/register"]);
  }

}
