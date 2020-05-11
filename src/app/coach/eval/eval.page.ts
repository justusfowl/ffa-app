import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { DataService } from 'src/app/services/dataservice';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.page.html',
  styleUrls: ['./eval.page.scss'],
})
export class EvalPage implements OnInit {

  sessionId : any; 
  session : any; 

  constructor(
    private translateCfgSrv : TranslateConfigService,
    private route: ActivatedRoute, 
    private dataSrv : DataService
  ) { }

  ngOnInit() {
    // this.assessment = this.route.snapshot.paramMap.get("assessment"); 

    this.route.params.subscribe(params => {
      this.sessionId = params.sessionId;
      this.loadSession();
    });


  }

  loadSession(){
    let endPoint = "/coach/session/" + this.sessionId;
    this.dataSrv.get(endPoint, true).then((res : any) => {
      this.session = res;
    }).catch(err => {
      console.error(err);
    });
  }

  getScore(evalDetails){
    let predictedClass = evalDetails["predict"];
    let scoring = evalDetails["p"+predictedClass];

    let adjustedScoring = 0.5-scoring;

    let outletScore = ((parseFloat(predictedClass)*0.2)+adjustedScoring)*100;
    return outletScore;
  }

  getEffectNumber(r : any){
    return Math.ceil(r.delta*100)
  }


  getAction(recommendation){
    let targetCol = "sug_" + this.translateCfgSrv.translate.currentLang;
    return recommendation[targetCol];
  }

  getActionDetails(recommendation){
    let targetCol = "display_" + this.translateCfgSrv.translate.currentLang;

    let initVal = recommendation["init_val_itm"][targetCol];
    let newVal = recommendation["new_val_itm"][targetCol];

    if (typeof(initVal) == "undefined" || typeof(initVal) == "undefined"){
      return  recommendation["init_val_itm"]["key"] + " → " +  recommendation["new_val_itm"]["key"];
    }else{
      return initVal + " → " + newVal;
    }

   

  }

}
