import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = '';
  messages = [];
  currentUser = '';

  constructor(
    public socket: Socket, 
    private toastCtrl: ToastController, 
    private authService : AuthService
  ) {

   }

   initService(){
    this.socket.connect();
 
    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;
    
    this.socket.emit('set-name', name);

    this.socket.fromEvent('hb').subscribe(data => {
      this.showToast('data: ' + JSON.stringify(data));
    });

    this.socket.fromEvent('userData').subscribe(data => {
      this.showToast('data: ' + JSON.stringify(data));
      this.authService.setUser(data);
    });



   }

   coachGetQuestion(){
     this.socket.emit('coach:ask')
   }


   async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }





}
