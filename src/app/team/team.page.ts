import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

    let docs = [
      {
        "name" : "Dr. Corinna Kaulfuss", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
      {
        "name" : "Dr. Stephanie Gärtner", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
      {
        "name" : "Dr. Corinna Kaulfuss", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
    ];

    let mfa = [
      {
        "name" : "Dr. Corinna Kaulfuss", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
      {
        "name" : "Dr. Stephanie Gärtner", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg",  
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
      {
        "name" : "Dr. Corinna Kaulfuss", 
        "role" : "Facharzt für Allgemeinmedizin",
        "picture" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/team/corinna_team.jpg", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna."
      },
    ];

    this.teamDocs = docs; 
    this.teamMfa = mfa;

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
