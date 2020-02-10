import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachchatPage } from '../coachchat/coachchat.page';

@Component({
  selector: 'app-coachstart',
  templateUrl: './coachstart.page.html',
  styleUrls: ['./coachstart.page.scss'],
})
export class CoachstartPage implements OnInit {

  evals: any[] = [];

  constructor(
    public modalController : ModalController
  ) { }

  ngOnInit() {

    let pastEvals = [
      {
        "evalDate" : "03-20-2020",
        "score" : 86
      },
      {
        "evalDate" : "01-21-2020",
        "score" : 83
      },
      {
        "evalDate" : "02-01-2020",
        "score" : 81
      }
    ];

    this.evals = pastEvals;

  }

  formatDate(d){
    let date = new Date(d) as any;

    return date.getDay() + "." + (parseInt(date.getMonth())+1) + ". '" + (date.getYear()-100);
  }

  async startEval(ev: any) {
    const modal = await this.modalController.create({
      component: CoachchatPage
    });
    return await modal.present();
  }


}
