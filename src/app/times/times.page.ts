import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
})
export class TimesPage implements OnInit {

  times : any[] = [];
  vacation : any[] = [];

  constructor() { }

  ngOnInit() {
    let times = [
      {
        "day" : "Montag", 
        "vomiStart" : "07:00", 
        "vomiEnd" : "11:30",
        "namiStart" : "14:00", 
        "namiEnd" : "16:30",
      },
      {
        "day" : "Dienstag", 
        "vomiStart" : "07:00", 
        "vomiEnd" : "11:30",
        "namiStart" : "14:00", 
        "namiEnd" : "16:30",
      },
      {
        "day" : "Mittwoch", 
        "vomiStart" : "07:00", 
        "vomiEnd" : "11:30"
      },
      {
        "day" : "Donnerstag", 
        "vomiStart" : "07:00", 
        "vomiEnd" : "11:30",
        "namiStart" : "14:00", 
        "namiEnd" : "16:30",
      },
      {
        "day" : "Freitag", 
        "vomiStart" : "07:00", 
        "vomiEnd" : "11:30"
      }
    ]

    let vacation = [
      {
        "vacationStart" : "01.01.2020", 
        "vacationEnd" : "05.01.2020", 
        "title" : "Neujahresurlaub"
      },
      {
        "vacationStart" : "05.02.2020", 
        "vacationEnd" : "10.03.2010", 
        "title" : "Tralala"
      },
      {
        "vacationStart" : "01.10.2020", 
        "vacationEnd" : "05.11.2021", 
        "title" : "Blabla Urlaub"
      },
    ]

    this.times = times;
    this.vacation = vacation;

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
  
}
