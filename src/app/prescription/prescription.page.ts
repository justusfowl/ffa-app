import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss', '../app.component.scss'],
})
export class PrescriptionPage implements OnInit {

  prescriptions : any[] = [];

  constructor() { }

  ngOnInit() {
  }

  getPrescriptions(refresher?){
    setTimeout(function(){
      refresher.target.complete();
    }, 1500 )
  }

}
