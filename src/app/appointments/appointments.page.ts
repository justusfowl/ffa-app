import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss', '../app.component.scss'],
})
export class AppointmentsPage implements OnInit {

  appointments : any[] = [];

  constructor() { }

  ngOnInit() {

  }

  getAppointments(refresher?){
    setTimeout(function(){
      refresher.target.complete();
    }, 1500 )
  }

}
