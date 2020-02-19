import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
})
export class TimesPage implements OnInit {

  times : any[] = [];
  vacation : any[] = [];

  constructor(
    private dataSrv : DataService, 
    private translateCfg : TranslateConfigService
  ) { }

  ngOnInit() {
    this.getTimes();
  }

  getTimes(refresher?){

    this.dataSrv.get("/times").then((result : any) => {
      this.times = result.opening;
      this.vacation = result.vacation;

      if (refresher){
        refresher.target.complete();
      }
    }).catch(err => {
      console.error(err);
    })

  }

  getIfIstoday(index){
    let date = new Date(); 

    if (index + 1 == date.getDay()){
      return true;
    }else{
      return false;
    }
  }

  getVacationDisplay(vacationObj){

    let startDate = new Date(vacationObj.vacationStart) as any;
    let endDate = new Date(vacationObj.vacationEnd) as any;

    if (startDate.getYear() == endDate.getYear()){

      if (startDate.getMonth() == endDate.getMonth()){
        return startDate.getDate() + " - " + endDate.getDate() + "." + (startDate.getMonth()+1) + "." + (startDate.getYear()-100);
      }else{
        return startDate.getDate() + "." + (startDate.getMonth()+1) + " - " + endDate.getDate() + "." + (endDate.getMonth()+1) + "." + (endDate.getYear()-100) 
      }
     
    }else{
      return startDate.getDate() + "." + (startDate.getMonth()+1) + "." + (startDate.getYear()-100) + " - " + endDate.getDate() + "." + (endDate.getMonth()+1) + "." + (endDate.getYear()-100) 
    }

  }

  getIsOpen(){

    let now = new Date(); 

    let flagIsOpen = false;

    let dayHrs = this.times[now.getDay()];

    if (this.getIsVacationClosed() != ""){
      return false;
    }

    if (dayHrs){

      var currentTime = now.getHours() * 60 + now.getMinutes();

      if (dayHrs.vomiStart){
        let start = parseInt(dayHrs.vomiStart.substring(0,dayHrs.vomiStart.indexOf(":")))*60+parseInt(dayHrs.vomiStart.substring(dayHrs.vomiStart.indexOf(":")+1,dayHrs.vomiStart.length));
        let end = parseInt(dayHrs.vomiEnd.substring(0,dayHrs.vomiEnd.indexOf(":")))*60+parseInt(dayHrs.vomiEnd.substring(dayHrs.vomiEnd.indexOf(":")+1,dayHrs.vomiEnd.length));
  
        if (start <= currentTime && currentTime <= end){
          flagIsOpen = true;
        }
      }
  
      if (dayHrs.namiStart){
        let start = parseInt(dayHrs.namiStart.substring(0,dayHrs.namiStart.indexOf(":")))*60+parseInt(dayHrs.namiStart.substring(dayHrs.namiStart.indexOf(":")+1,dayHrs.namiStart.length));
        let end = parseInt(dayHrs.namiEnd.substring(0,dayHrs.namiEnd.indexOf(":")))*60+parseInt(dayHrs.namiEnd.substring(dayHrs.namiEnd.indexOf(":")+1,dayHrs.namiEnd.length));
  
        if (start <= currentTime && currentTime <= end){
          flagIsOpen = true;
        }
      }
  
      return flagIsOpen;

    }else{
      return false;
    }

  }

  getIsVacationClosed(){
    let flagIsCurrentlyVacation = "";
    let today = new Date();

    this.vacation.forEach(element => {

      let start = new Date(element.vacationStart);
      let end = new Date(element.vacationEnd);

      if (start <= today && start <= end){
        flagIsCurrentlyVacation = this.translateCfg.translate.instant('CURRENTLY_CLOSED_VACATION');
      }
      
    });

    return flagIsCurrentlyVacation;

  }
  
}
