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
  loader : any = null; 

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

    this.socket.fromEvent('loading').subscribe(data => {
      this.setLoading(true);
      console.log("socket calls for loading..")
    });
     
    this.socket.fromEvent('hb').subscribe(data => {
      this.showToast(this.translateCfg.translate.instant("SOCKET_CONNECTED"));
    });

    this.socket.fromEvent('connect').subscribe(data => {
      let token = this.auth.token; 
      this.socket.emit('authentication', { "token" : token })
    });

    this.socket.fromEvent('token:expired').subscribe(data => {
      this.showToast(this.translateCfg.translate.instant("TOKEN_EXPIRED"));
      this.auth.logout();
    });

    this.socket.fromEvent('disconnect').subscribe(data => {
      this.showToast(this.translateCfg.translate.instant("SOCKET_DISCONNECTED"));
    });

    this.socket.connect();

   }

   coachGetQuestion(sessionObj){
     this.socket.emit('coach:ask', sessionObj)
   }


   async showToast(msg, duration=2000) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: duration
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


  async setLoading(isLoading){

    console.log(isLoading)
    
    let api = this;
    if (isLoading){
      if (!api.loader && !api.loading){
        api.loading = isLoading;
        this.loader = await api.loadingController.create({
          message: api.translateCfg.translate.instant("PLEASE_WAIT")+"..."
        });
        try{
          await api.loader.present();
        }catch(err){

        }
        
      }
    }else{
      if (api.loader){
        try{
          await api.loader.dismiss()
          .then(()=>{
            api.loader = null;
            api.loading = false;
          })
          .catch(e => console.log(e));
        }catch(err){

        }

      }
    }

  }

async  forceLoaderDismiss(){
    if (this.loader){

      await this.loader.dismiss()
      .then(()=>{
        this.loader = null;
        this.loading = false;
      })
      .catch(e => console.log(e));;
    }
  }


  // REST Area 


  get(endPoint, enableLoader=true){  
    this.loading = true;
    if (enableLoader){
      this.setLoading(true);
    }
    
    const api = this;

    return new Promise(function(resolve, reject) {
      
      api.http.get(api.apiUrl + endPoint).subscribe(
        (data: any) => { 
          
          api.loading = false;
          if (enableLoader){
            setTimeout(function(){
              api.setLoading(false);
            },500)
          }

          resolve(data)
        },
        error => {
          api.loading = false;
          api.handleAPIError(error);
          reject(error)
        }
      )
    });
  }

  
  handleAPIError(error){
    if (!error.flagHasActionHappened){
      
      let msg = this.translateCfg.translate.instant("UNIVERSAL_API_ERROR");
      this.showError(msg);
      console.error(error);
    }

    this.forceLoaderDismiss();

  }


}
