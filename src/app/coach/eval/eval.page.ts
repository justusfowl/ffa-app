import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.page.html',
  styleUrls: ['./eval.page.scss'],
})
export class EvalPage implements OnInit {

  assessmentId : any; 
  assessment : any =  {
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
  };

  constructor(
    private translateCfgSrv : TranslateConfigService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.assessment = this.route.snapshot.paramMap.get("assessment"); 

    this.route.params.subscribe(params => {
      this.assessmentId = params;
    });

  }

  getAction(recommendation){
    let targetCol = "a_" + this.translateCfgSrv.translate.currentLang;
    return recommendation[targetCol];
  }

}
