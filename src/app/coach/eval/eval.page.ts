import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { DataService } from 'src/app/services/dataservice';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.page.html',
  styleUrls: ['./eval.page.scss'],
})
export class EvalPage implements OnInit {

  sessionId : any; 
  session : any; 
  flagReEvaluate : boolean = false;

  constructor(
    private translateCfgSrv : TranslateConfigService,
    private route: ActivatedRoute, 
    private dataSrv : DataService, 
    private translateCfg : TranslateConfigService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.dataSrv.setLoading(true);

    this.route.queryParams.subscribe(params => {
      if (params && params.reevaluate) {
        this.flagReEvaluate = params.reevaluate;
      }
    });


    this.route.params.subscribe(params => {
      this.sessionId = params.sessionId;
      this.loadSession();
    });

  }

  loadSession(){
    let self = this;
    let endPoint = "/coach/session/" + this.sessionId;

    if (this.flagReEvaluate){
      endPoint += "?reevaluate=true"
    }

    this.dataSrv.get(endPoint, true).then((res : any) => {
      this.session = res;
      this.dataSrv.setLoading(false);

    }).catch(err => {

      this.dataSrv.setLoading(false);
      self.dataSrv.showError(this.translateCfg.translate.instant("UNIVERSAL_API_ERROR"));

      setTimeout(function(){
        self.navCtrl.back();
      }, 2000)
     
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

  getCoachScoreCallToAction(){

    let score = parseFloat(this.session.evaluation.score) || -1;

    if (score > 0 && score < 4){
      return this.translateCfg.translate.instant("COACH_ACTION_BAD_SCORE");
    }else if  (score >= 4 && score < 5){
      return this.translateCfg.translate.instant("COACH_ACTION_GOOD_SCORE");
    }else if  (score > 4){
      return this.translateCfg.translate.instant("COACH_ACTION_GREAT_SCORE");
    }else if  (score < 0){
      return this.translateCfg.translate.instant("COACH_ACTION_NO_SCORE");
    }

  }


  getAction(recommendation){
    let targetCol = "sug_" + this.translateCfgSrv.translate.currentLang;
    return recommendation[targetCol];
  }

  getActionDetails(recommendation){

    

    if (typeof(recommendation.meta.flagShowTargetVal) == "undefined"){
      return false;
    }

    console.log(recommendation);

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
