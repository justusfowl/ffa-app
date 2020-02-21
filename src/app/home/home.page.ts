import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/dataservice';
import { TranslateConfigService } from '../services/translate-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  times : any[] = [];
  vacation : any[] = [];

  news : any[] = [];

  constructor(
    private dataSrv : DataService, 
    private translateCfg : TranslateConfigService, 
    private router : Router
  ) {

  }

  ngOnInit(){
    this.getNews();
  }

  getNews(refresher?){
    this.dataSrv.get('/news').then((newsResult:any) => {
      this.news = newsResult;

      this.getTimes();

      if (refresher){
        refresher.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        // refresher.target.disabled = true;
      }

    }).catch(err => {
      console.error(err);
    })
  }

  gotToNews(news?){
    this.router.navigate(['/news-detail',news._id]);
  }

  

  getTimes(){

    this.dataSrv.get("/times").then((result : any) => {
      this.times = result.opening;
      this.vacation = result.vacation;
    }).catch(err => {
      console.error(err);
    })

  }

  clickOpen(evt){
    console.log(evt);
    this.router.navigate(['/times']);
  }

  clickClosed(evt){
    console.log(evt);
  }

  getImageUrl(img){
    if (img.image){
      return img.image;
    }else{
      return "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/landing_img.png";
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
