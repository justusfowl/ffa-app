import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachchatPage } from '../coachchat/coachchat.page';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice';

@Component({
  selector: 'app-coachstart',
  templateUrl: './coachstart.page.html',
  styleUrls: ['./coachstart.page.scss', '../../app.component.scss'],
})
export class CoachstartPage implements OnInit {

  evals: any[] = [];

  constructor(
    public modalController : ModalController, 
    private router: Router, 
    private dataSrv : DataService
  ) { }

  ngOnInit() {    
    this.getSessions();
  }

  formatDate(d){
    let date = new Date(d) as any;

    return date.getDate() + "." + (parseInt(date.getMonth())+1) + "." + (date.getYear()-100);
  }

  async demoStartEval(ev?: any) {

    const modal = await this.modalController.create({
      component: CoachchatPage, 
      componentProps: {
        sessionObj : this.evals[0]
      }
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data){
        if (result.data.complete) {
          console.log('COMPLETE');
          this.goToEval(result.data);
        }

        this.getSessions();
      }
    });
    
    await modal.present();


  }


  async startEval(ev?: any) {

    const modal = await this.modalController.create({
      component: CoachchatPage
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data){
        if (result.data.complete) {
          console.log('COMPLETE');
          this.goToEval(result.data);
        }

        this.getSessions();
      }
    });
    
    await modal.present();


  }

  goToEval(session){
    this.router.navigate(['/coach/eval', session._id]);
  }

  removeEval(session){
    this.dataSrv.delete("/coach/session/" + session._id).then(res => {
      let currIdx = this.evals.findIndex(x => x == session);
      this.evals.splice(currIdx, 1);
    })
  }

  getSessions(refresher?){
    let enableLoader = true;
    if (refresher){
      enableLoader = false;
    }
    this.dataSrv.get("/coach/sessions", enableLoader).then((result : any) => {
      this.evals = result;
      if (refresher){
        refresher.target.complete();
      }
    }).catch(err => {
      if (refresher){
        refresher.target.complete();
      }
    });
  }

  refreshSessions(evt){
    this.getSessions(evt);
  }




}
