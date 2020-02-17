import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { TranslateConfigService } from './translate-config.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = '';
  messages = [];

  loading : boolean = false;
  loader : any; 

  apiUrl = "http://localhost:8000/api/v01";

 
  constructor(
    public socket: Socket, 
    private toastCtrl: ToastController, 
    private http: HttpClient,
    private loadingController: LoadingController, 
    private translateCfg : TranslateConfigService, 
    private auth : AuthService
  ) {

   }

   initService(){
     
    this.socket.fromEvent('hb').subscribe(data => {
      this.showToast(this.translateCfg.translate.instant("SOCKET_CONNECTED"));
    });

    this.socket.fromEvent('connect').subscribe(data => {
      let token = this.auth.token; 
      this.socket.emit('authentication', { "token" : token })
    });

    this.socket.fromEvent('disconnect').subscribe(data => {
      this.showToast(this.translateCfg.translate.instant("SOCKET_DISCONNECTED"));
    });

    this.socket.connect();

   }

   coachGetQuestion(sessionObj){
     this.socket.emit('coach:ask', sessionObj)
   }


   async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async showError(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 3000, 
      color: "dark"
    });
    toast.present();
  }



  setLoading(isLoading){
    this.loading = isLoading;

    if (isLoading){
      this.showLoading();
    }else{
      this.dismissLoader();
    }
  }

  
  dismissLoader(){
    if (this.loader){
      this.loader.dismiss();  
    }
  }

  async showLoading(){
      this.loader = await this.loadingController.create({
        message: this.translateCfg.translate.instant("PLEASE_WAIT")+"...",
        duration: 2000
      });
      await this.loader.present();
    
  }


  // REST Area 


  get(endPoint, enableLoader=true){  
    if (enableLoader){
      this.setLoading(true);
    }
    
    const api = this;

    return new Promise(function(resolve, reject) {
      
      api.http.get(api.apiUrl + endPoint).subscribe(
        (data: any) => {    
          resolve(data)
        },
        error => {
          api.handleAPIError(error);
          reject(error)
        }
      )
    });
  }

  
  handleAPIError(error){
    this.setLoading(false);
    let msg = this.translateCfg.translate.instant("UNIVERSAL_API_ERROR");
    this.showError(msg);
    console.error(error);
  }


}
