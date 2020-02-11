import { Component, OnInit  } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { DatePipe } from '@angular/common';
import { ModalController, AlertController } from '@ionic/angular';
import { ProfilePage } from 'src/app/profile/profile.page';
import { DataService } from 'src/app/services/dataservice';
@Component({
  selector: 'app-coachchat',
  templateUrl: './coachchat.page.html',
  styleUrls: ['./coachchat.page.scss'],
})
export class CoachchatPage implements OnInit {

  progressValue : number = 0.3;

  profileComplete : boolean = false;
  chatStartDate : Date = new Date();

  chats : any[] = [];
  message : string;
  sending : boolean;

  demoLastNum = 0;

  currentQuestion : any;
  displayValuesRange : any[] = [];
  displaySelect : any[] = [];
  flagQuestionIsBinary : boolean = false;
  flagDateInput : boolean = false;
  flagContinuousSlider : boolean = false;

  answerObj : any; 

  constructor(
    private translateCfgSrv : TranslateConfigService, 
    private datePipe : DatePipe, 
    private modalController : ModalController, 
    private dataSrv : DataService, 
    public alertController: AlertController
  ) { 


  }

  ngOnInit() {

    if (this.checkProfileStatus()){
      this.profileComplete = true;
      this.startChat();
    }else{
      this.profileComplete = false;
    }

    this.dataSrv.socket.fromEvent('coach:question').subscribe(question => {
      console.log(question);
      this.setNewQuestion(question)
    });

  }

  checkProfileStatus(){
    return false
  }

  startChat(){
    this.dataSrv.coachGetQuestion();
  }

  scrollIntoView(){
    let container = document.getElementById("chatbox");
    container.scrollTo(0,99999999);
  }

  
  getQuestion(){
    // backend integration

    let question = {
      "q_en" : "How are you?", 
      "q_de" : "Wie geht es dir?",
      "type" : "date",  
      "meta" : [
        {
          "val" : 1, 
          "display_en" : "Very bad",
          "display_de" : "Sehr schlecht"
        },
        {
          "val" : 5, 
          "display_en" : "Very good",
          "display_de" : "Sehr gut"
        }
      ]
    };

    this.setNewQuestion(question)
  }

  addToChat(msgText, origin){

    let self = this;

    let msg = {
      "message" : msgText, 
      "createdAt" : new Date(), 
      "type" : origin,
      "isMe" : (origin != "bot")
    };

    this.chats.push(msg);

    setTimeout(function(){
      self.scrollIntoView()
    }, 50);

  }

  resetAnswerContainer(question){
    this.flagContinuousSlider = false;
    this.flagQuestionIsBinary = false;
    this.flagDateInput = false;
    this.displayValuesRange.length = 0;
    this.displaySelect.length = 0;

    this.answerObj = {
      "varname" : question.varname, 
      "value" : null
    };

    this.currentQuestion = null;
  }

  setNewQuestion(question){

    this.resetAnswerContainer(question);
    this.currentQuestion = question;

    let targetCol = "q_" + this.translateCfgSrv.translate.currentLang;

    this.addToChat(question[targetCol], "bot");

    if (question.type == "slider"){
      this.setDisplayValuesRange(question);
    }else if (question.type == "binary"){
      this.flagQuestionIsBinary = true;
    }else if (question.type == "date"){
      this.flagDateInput = true;
    }else if (question.type == "select"){
      this.setInputSelectValues(question);
    }else if (question.type == "continuous"){
      this.flagContinuousSlider = true;
    }
  }

  setDisplayValuesRange(question){
    let vals = question.meta;
    let targetCol = "display_" + this.translateCfgSrv.translate.currentLang;

    vals.forEach(element => {
      element["display"] = element[targetCol]
    });

    this.displayValuesRange = vals;
  }

  setInputSelectValues(question){
    let selects = question.meta;

    let targetCol = "display_" + this.translateCfgSrv.translate.currentLang;

    selects.forEach(element => {
      element["display"] = element[targetCol]
    });

    this.displaySelect = selects;
  }

  handleDatePicked(evt){
    console.log(evt);

    this.answerObj["key"] = evt.detail.value;
    this.answerObj["value"] = this.datePipe.transform(new Date(evt.detail.value),'dd-MM-yyyy');

  }

  handleSelected(evt){
    console.log(evt);

    this.answerObj["key"] =evt.detail.value.val;
    this.answerObj["value"] = evt.detail.value.display;
  }

  handleBinaryAnswer(answer){
    let answerDisplay = this.translateCfgSrv.translate.instant(answer);
    let answerKey;

    if (answer.toLowerCase() == 'yes'){
      answerKey = 1;
    }else{
      answerKey = 2;
    }

    this.answerObj["key"] = answerKey;
    this.answerObj["value"] = answerDisplay;

    this.submitAnswer();

  }

  submitAnswer(answerObj?){

    if (!answerObj){
      answerObj = this.answerObj;
    }

    if (!answerObj.value){
      console.error("No value passed for answerObj");
      return;
    }

    this.addToChat(answerObj.value, "answer");

    this.dataSrv.coachGetQuestion();

  }

  async openProfile(ev: any) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });

    modal.onDidDismiss().then((detail: any) => {
        if (detail !== null) {
          console.log('The result:', detail.data);
        }

        this.profileComplete = true;

        let thankMsg = this.translateCfgSrv.translate.instant("CHAT_INITIAL_MASTERDATA_THANK");
        this.addToChat(thankMsg, "bot");
        this.startChat();
    });
    
    await modal.present();
  }
  
  async closeModal() {
    const alert = await this.alertController.create({
      header: this.translateCfgSrv.translate.instant("COACH_CLOSE_HEADER"),
      message: this.translateCfgSrv.translate.instant("COACH_CLOSE_MESSAGE"),
      buttons: [
        {
          text: this.translateCfgSrv.translate.instant("CANCEL"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text:  this.translateCfgSrv.translate.instant("OK"),
          handler: () => {
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

}
