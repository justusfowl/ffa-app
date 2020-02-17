import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/dataservice';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser : any;

  allStates : any[] = [];
  allJobTypes : any[] = [];
  allProfEdu : any[] = [];

  SDhvtypD : any[] = [];
  SDmainstat : any[] = [];
  PAhhtype : any[] = [];

  constructor(
    private modalCtrl:ModalController, 
    private authService : AuthService, 
    private dataSrv : DataService, 
    private translateCfg : TranslateConfigService) { }

  ngOnInit() {

    this.setupStates(); 
    this.setupProfEdu();
    this.setupJobType();
    this.setupSDhvtypD();
    this.setupPAhhtype();
    this.setupSDmainstat();

    this.authService.currentUser.subscribe((x : any) => {

      if(x){
        this.currentUser = x
      }
      
    });

  }

  setupPAhhtype(){
    let items = [
      {
        "value" : 10, 
        "display" : "PAhhtype.10"
      },
      {
        "value" : 20, 
        "display" : "PAhhtype.20"
      },
      {
        "value" : 21, 
        "display" : "PAhhtype.21"
      },
      {
        "value" : 22, 
        "display" : "PAhhtype.22"
      },
      {
        "value" : 23, 
        "display" : "PAhhtype.23"
      },
      {
        "value" : 24, 
        "display" : "PAhhtype.24"
      },
      {
        "value" : 25, 
        "display" : "PAhhtype.25"
      }
    ];

    this.PAhhtype = items;
  }

  setupSDmainstat(){

    let items = [
      {
        "value" : 10, 
        "display" : "SDmainstat.10"
      },
      {
        "value" : 20, 
        "display" : "SDmainstat.20"
      },
      {
        "value" : 31, 
        "display" : "SDmainstat.31"
      },
      {
        "value" : 32, 
        "display" : "SDmainstat.32"
      },
      {
        "value" : 33, 
        "display" : "SDmainstat.33"
      },
      {
        "value" : 34, 
        "display" : "SDmainstat.34"
      },
      {
        "value" : 35, 
        "display" : "SDmainstat.35"
      }
    ];

    this.SDmainstat = items;
  }

  setupSDhvtypD(){
    for (var i=1;i<6;i++){
      this.SDhvtypD.push({
        "value" : i, 
        "display" : "SDhvtypD."+i
      })
    }
  }
  
  setupProfEdu(){

    this.allProfEdu.push({
      "value" : -96, 
      "display" : "ProfEdu.-96"
    })
    
    for (var i=1;i<19;i++){
      this.allProfEdu.push({
        "value" : i, 
        "display" : "ProfEdu."+i
      })
    }

  }

  setupJobType(){

    this.allJobTypes.push({
      "value" : -96, 
      "display" : "JobType.-96"
    })
    
    for (var i=1;i<3;i++){
      this.allJobTypes.push({
        "value" : i, 
        "display" : "JobType."+i
      })
    }

  }

  setupStates(){

    this.allStates.push({
      "value" : -97, 
      "display" : "States.-97"
    })
    
    for (var i=1;i<17;i++){
      this.allStates.push({
        "value" : i, 
        "display" : "States."+i
      })
    }

  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveDataAndClose(){
    console.log(this.currentUser);
    let self = this; 
    this.authService.updateProfile(this.currentUser)
    .subscribe(
      userData => {
        this.dataSrv.showToast(this.translateCfg.translate.instant("PROFILE_UPDATE_SUCCESS"));
        setTimeout(function(){
          self.closeModal();
        },1000)
        this.dataSrv.setLoading(false);
      },
      error => {
          this.dataSrv.setLoading(false);
          console.error(error);
      });
  }

}
