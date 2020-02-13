import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoachchatPage } from '../coachchat/coachchat.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coachstart',
  templateUrl: './coachstart.page.html',
  styleUrls: ['./coachstart.page.scss'],
})
export class CoachstartPage implements OnInit {

  evals: any[] = [];



  constructor(
    public modalController : ModalController, 
    private router: Router
  ) { }

  ngOnInit() {    

    let pastEvals = [
      {
        "evalDate" : "03-20-2020",
        "score" : 86, 
        "recommendations" : [
          {
            "boostFactorPerc" : 5.42123, 
            "varname" : "ABC",
            "a_de" : "Essen Sie eine Portion mehr Obst pro Woche",
            "a_en" : "Eat one more portion of fruit per week",
          }, 
          {
            "boostFactorPerc" : 3.142123, 
            "varname" : "DEF",
            "a_de" : "Lassen Sie sich gegen Tetanus impfen.",
            "a_en" : "Get a tetanus vaccination",
          }, 
          {
            "boostFactorPerc" : 1.42123, 
            "a_de" : "Rauchen Sie eine Zigarette weniger am Tag",
            "a_en" : "Smoke one cigarette less per day",
          }
        ]
      },
      {
        "evalDate" : "01-21-2020",
        "score" : 83, 
        "recommendations" : [
          {
            "boostFactorPerc" : 5.42123, 
            "varname" : "ABC",
            "a_de" : "Essen Sie eine Portion mehr Obst pro Woche",
            "a_en" : "Eat one more portion of fruit per week",
          }, 
          {
            "boostFactorPerc" : 3.142123, 
            "varname" : "DEF",
            "a_de" : "Lassen Sie sich gegen Tetanus impfen.",
            "a_en" : "Get a tetanus vaccination",
          }, 
          {
            "boostFactorPerc" : 1.42123, 
            "a_de" : "Rauchen Sie eine Zigarette weniger am Tag",
            "a_en" : "Smoke one cigarette less per day",
          }
        ]
      },
      {
        "evalDate" : "02-01-2020",
        "score" : 81, 
        "recommendations" : [
          {
            "boostFactorPerc" : 5.42123, 
            "varname" : "ABC",
            "a_de" : "Essen Sie eine Portion mehr Obst pro Woche",
            "a_en" : "Eat one more portion of fruit per week",
          }, 
          {
            "boostFactorPerc" : 3.142123, 
            "varname" : "DEF",
            "a_de" : "Lassen Sie sich gegen Tetanus impfen.",
            "a_en" : "Get a tetanus vaccination",
          }, 
          {
            "boostFactorPerc" : 1.42123, 
            "a_de" : "Rauchen Sie eine Zigarette weniger am Tag",
            "a_en" : "Smoke one cigarette less per day",
          }
        ]
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

    modal.onDidDismiss().then((result: any) => {
      if (result.data){
        if (result.data.complete) {
          console.log('COMPLETE');
          this.goToEval(result.data);
        }
      }


    });
    
    await modal.present();


  }

  goToEval(assessment){
    this.router.navigate(['/coach/eval', assessment]);
  }




}
