import { Component, OnInit } from '@angular/core';
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
export class LoginPage implements OnInit {

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

  login() {

    if (!this.user.userName || !this.user.password) {
          return;
      }

      this.dataSrv.setLoading(true);
      

      this.auth.login(this.user.userName, this.user.password)
          .subscribe(
              userData => {
                  this.router.navigate(["/home"], { replaceUrl: true });
                  this.dataSrv.initService();
                  this.dataSrv.setLoading(false);
              },
              error => {
                this.dataSrv.setLoading(false);
                  this.dataSrv.showError(this.translateCfg.translate.instant("LOGIN_ERROR"));
                  console.error(error);
              });
  }

}
