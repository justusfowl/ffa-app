import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  teamDocs : any[] = [];
  teamMfa : any[] = [];

  selectedMemberType : string = "";
  selectedIdx : number;

  constructor(
    private dataSrv : DataService
  ) { }

  ngOnInit() {

    this.getTeam();

  }

  getTeam(refresher?){
    this.dataSrv.get("/team").then((data : any) => {
      this.teamDocs = data.docs;
      this.teamMfa = data.mfa;

      if (refresher){
        refresher.target.complete();
      }
    }).catch(err => {
      console.error(err);
    })
  }

  selectMember(type, idx){
    if (this.selectedMemberType == type && this.selectedIdx == idx){
      this.selectedIdx = null; 
      this.selectedMemberType = null;
    }else{
      this.selectedIdx = idx; 
      this.selectedMemberType = type;
    }
  }

}
